import Role from '../models/Role.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';
import UserToken from '../models/UserTokens.js';
import nodemailer from 'nodemailer';    

export const registerUser = async (req, res, next)=>{
    try {
        const {firstName, lastName, username, email, password} = req.body;
        const role = await Role.find({role: "User"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
           firstName,
           lastName,
           username,
           email,
           password: hashedPassword,
           roles: role
        })
        await newUser.save();
        return next(createSuccess(200, "User registered successfully!", newUser));
    } catch (error) {
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }

}


export const loginUser = async (req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles", "role");
        const { roles } = user;

        if(!user){
            return next(createError(404, "User not found!"));
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return next(createError(400, "Invalid password!"));
        }
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin, roles: roles}, 
            process.env.JWT_SECRET
        );
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "User logged in successfully!",
            data: user
        });
        
    } catch (error) {
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }
}


export const registerAdmin = async (req, res, next)=>{
    const {firstName, lastName, username, email, password} = req.body;
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            isAdmin: true,
            roles: role
        })
        await newUser.save();
        return next(createSuccess(200, "User registered as admin successfully!", newUser));

    } catch (error) {
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }

}

export const sendEmail = async (req, res, next)=>{  
    const email = req.body.email;
    const user = await User.findOne({email: {$regex: '^' + email + '$', $options: 'i'}});
    if(!user){
        return next(createError(404, "User not found!"));
    }
    const payload = {
        email: user.email,
    }
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiryTime});
    
    const newToken = new UserToken({
        userId: user._id,
        token: token
    });

    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "touhidulhaider2001@gmail.com",
            pass: "kdlf btka qewg lzdg"
        }
    });

    let mailDetails = {
        from: "touhidulhaider2001@gmail.com",
        to: email,
        subject: "OIMS - Reset Password",
        html: `
        <html>
        <head>
            <title>OIMS - Reset Password</title>
        </head>
        <body>
            <h1>Click the following link to reset your password: </h1>
            <a href="${process.env.LIVE_URL}/reset-password/${token}">Reset Password</a>
            <p>This link will expire in 5 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,</p>
            <p>OIMS Team</p>
        </body>
        </html>
        `
    };
    mailTransporter.sendMail(mailDetails, async(error, data) =>{
        if(error){
            console.log(error);
            return next(createError(500, "Internal Server Error!"));
        }else{
            await newToken.save();
            return next(createSuccess(200, "Email sent successfully!", newToken));
        }
    });
}   
