import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

/**
 * POST /api/login
 * Autenticación del bibliotecario
 */
router.post('/login', authController.login.bind(authController));

export default router;
