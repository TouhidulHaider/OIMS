import Role from '../models/Role.js';
import User from '../models/User.js';
import Session from '../models/Session.js';
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

        if(!user){
            return next(createError(404, "User not found!"));
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return next(createError(400, "Invalid password!"));
        }

        // Check if user already has an active session
        const existingSession = await Session.findOne({ userId: user._id });
        if (existingSession) {
            return next(createError(400, "User is already logged in on another device. Please logout first."));
        }

        const { roles } = user;
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin, roles: roles}, 
            process.env.JWT_SECRET
        );
        
        // Create new session
        const session = new Session({
            userId: user._id,
            token: token
        });
        await session.save();
        
        // Set cookie and return success response
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        return next(createSuccess(200, "User logged in successfully!", {
            user,
            token
        }));
        
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
            <a href="${process.env.LIVE_URL}/reset/${token}">Reset Password</a>
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

export const resetPassword = async (req, res, next)=>{
    const token = req.params.token;
    const newPassword = req.body.password;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({email: {$regex: '^' + decoded.email + '$', $options: 'i'}});
        
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        // Delete the used token
        await UserToken.deleteOne({ token: token });
        
        // Update user password
        user.password = hashedPassword;
        await user.save();
        
        return next(createSuccess(200, "Password reset successfully!", user));
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(createError(400, "Reset token has expired!"));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(createError(400, "Invalid token!"));
        }
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }
}

// Add logout function to handle session cleanup
export const logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return next(createError(400, "No token provided"));
        }

        // Delete the session
        await Session.deleteOne({ token: token });
        
        // Clear the cookie
        res.clearCookie("access_token");
        
        return next(createSuccess(200, "Logged out successfully"));
    } catch (error) {
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }
};