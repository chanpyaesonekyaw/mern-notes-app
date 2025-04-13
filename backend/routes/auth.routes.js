import express from 'express';
import { createAccount, login, getUser, logout } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', createAccount);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.get('/get-user', authenticateToken, getUser);

export default router;