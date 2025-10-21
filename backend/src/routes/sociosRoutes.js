import express from 'express';
import sociosController from '../controllers/sociosController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyToken);

/**
 * GET /api/socios
 * Obtener todos los socios
 */
router.get('/', sociosController.getAllSocios.bind(sociosController));

/**
 * GET /api/socios/:id
 * Obtener un socio por ID
 */
router.get('/:id', sociosController.getSocioById.bind(sociosController));

/**
 * POST /api/socios (Proceso 3: Alta Socio)
 * Crear un nuevo socio
 */
router.post('/', sociosController.createSocio.bind(sociosController));

/**
 * PUT /api/socios/:id
 * Actualizar un socio
 */
router.put('/:id', sociosController.updateSocio.bind(sociosController));

/**
 * DELETE /api/socios/:id
 * Eliminar un socio
 */
router.delete('/:id', sociosController.deleteSocio.bind(sociosController));

export default router;
