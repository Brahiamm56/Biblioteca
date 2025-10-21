import express from 'express';
import librosController from '../controllers/librosController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyToken);

/**
 * GET /api/libros
 * Obtener todos los libros
 */
router.get('/', librosController.getAllLibros.bind(librosController));

/**
 * GET /api/libros/:id
 * Obtener un libro por ID
 */
router.get('/:id', librosController.getLibroById.bind(librosController));

/**
 * POST /api/libros
 * Crear un nuevo libro
 */
router.post('/', librosController.createLibro.bind(librosController));

/**
 * PUT /api/libros/:id
 * Actualizar un libro
 */
router.put('/:id', librosController.updateLibro.bind(librosController));

/**
 * DELETE /api/libros/:id
 * Eliminar un libro
 */
router.delete('/:id', librosController.deleteLibro.bind(librosController));

export default router;
