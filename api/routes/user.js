import express from 'express';
import { getAllUsers, getUser, updateUser } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/all', verifyAdmin, getAllUsers);

router.get('/:id', verifyUser, getUser);
router.put('/:id', verifyUser, updateUser);

export default router;

