import express from 'express';
import { getAllUsers, getUser } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/all', verifyAdmin, getAllUsers);

router.get('/:id', verifyUser, getUser);

export default router;

