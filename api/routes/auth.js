import express from 'express';
import { registerUser, loginUser, registerAdmin, sendEmail } from '../controllers/auth.controller.js';
import { getUser } from '../controllers/user.controller.js';

const router = express.Router();

// register a new user
router.post('/register', registerUser);

// login a user     
router.post('/login', loginUser);

router.post('/get-user/:id', getUser);

// register as admin
router.post('/register-admin', registerAdmin);

router.post('/send-email', sendEmail);

export default router;
