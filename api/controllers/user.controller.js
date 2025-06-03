import User from '../models/User.js';
import { createSuccess, createError } from '../utils/response.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'uploads', 'profile');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

export const getAllUsers = async (req, res, next)=>{
    try {
        const users = await User.find();
        return next(createSuccess(200, "Users fetched successfully!", users));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const getUser = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(createError(404, "User not found!"));
        }   
        return next(createSuccess(200, "User fetched successfully!", user));        
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const updateUser = async (req, res, next) => {
    try {
        upload(req, res, async function(err) {
            if (err) {
                console.error('Upload error:', err);
                return next(createError(400, err.message));
            }

            const { firstName, lastName, email } = req.body;
            const userId = req.params.id;

            // Check if user exists
            const user = await User.findById(userId);
            if (!user) {
                return next(createError(404, "User not found!"));
            }

            // Check if email is being changed and if it's already taken
            if (email && email !== user.email) {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return next(createError(400, "Email is already taken!"));
                }
            }

            // If there's a new file uploaded, delete the old one
            if (req.file && user.profileImage) {
                try {
                    const oldImagePath = user.profileImage.replace(`${req.protocol}://${req.get('host')}/`, '');
                    const fullOldPath = path.join(__dirname, '..', oldImagePath);
                    if (fs.existsSync(fullOldPath)) {
                        fs.unlinkSync(fullOldPath);
                    }
                } catch (error) {
                    console.error('Error deleting old image:', error);
                }
            }

            // Update user fields
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    firstName: firstName || user.firstName,
                    lastName: lastName || user.lastName,
                    email: email || user.email,
                    profileImage: req.file ? `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}` : user.profileImage
                },
                { new: true }
            ).select('-password'); // Exclude password from response

            return next(createSuccess(200, "Profile updated successfully!", updatedUser));
        });
    } catch (error) {
        console.error('Update user error:', error);
        return next(createError(500, "Internal Server Error!"));
    }
}
