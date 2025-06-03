import express from 'express';
import { registerUser, loginUser, registerAdmin, sendEmail, resetPassword, logoutUser } from '../controllers/auth.controller.js';
import { getUser } from '../controllers/user.controller.js';

const router = express.Router();

// register a new user
router.post('/register', registerUser);

// login a user     
router.post('/login', loginUser);

// logout a user
router.post('/logout', logoutUser);

router.post('/get-user/:id', getUser);

// register as admin
router.post('/register-admin', registerAdmin);

router.post('/send-email', sendEmail);

router.post('/reset-password/:token', resetPassword, (req, res, next)=>{
    res.status(200).json({
        message: "Password reset successfully!",
        token: req.params.token
    });
});

export default router;
