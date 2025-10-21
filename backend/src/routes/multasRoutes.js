import express from 'express';
import multasController from '../controllers/multasController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyToken);

/**
 * GET /api/multas
 * Obtener todas las multas
 */
router.get('/', multasController.getAllMultas.bind(multasController));

/**
 * GET /api/multas/:id
 * Obtener una multa por ID
 */
router.get('/:id', multasController.getMultaById.bind(multasController));

/**
 * POST /api/multas
 * Crear una nueva multa
 */
router.post('/', multasController.createMulta.bind(multasController));

/**
 * DELETE /api/multas/:id
 * Eliminar una multa
 */
router.delete('/:id', multasController.deleteMulta.bind(multasController));

export default router;
