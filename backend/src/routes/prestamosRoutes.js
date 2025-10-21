import express from 'express';
import prestamosController from '../controllers/prestamosController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyToken);

/**
 * GET /api/prestamos
 * Obtener todos los préstamos
 */
router.get('/', prestamosController.getAllPrestamos.bind(prestamosController));

/**
 * GET /api/prestamos/activos
 * Obtener préstamos activos (sin fecha de devolución real)
 */
router.get('/activos', prestamosController.getPrestamosActivos.bind(prestamosController));

/**
 * GET /api/prestamos/:id
 * Obtener un préstamo por ID
 */
router.get('/:id', prestamosController.getPrestamoById.bind(prestamosController));

/**
 * POST /api/prestamos (Proceso 1: Préstamo de Libro)
 * Crear un nuevo préstamo
 */
router.post('/', prestamosController.createPrestamo.bind(prestamosController));

/**
 * PUT /api/prestamos/devolver/:id (Proceso 2: Devolución de Libro)
 * Devolver un libro
 */
router.put('/devolver/:id', prestamosController.devolverLibro.bind(prestamosController));

/**
 * DELETE /api/prestamos/:id
 * Eliminar un préstamo
 */
router.delete('/:id', prestamosController.deletePrestamo.bind(prestamosController));

export default router;
