import prestamosService from '../services/prestamosService.js';

/**
 * Controlador de Préstamos
 */
class PrestamosController {
  /**
   * GET /api/prestamos
   * Obtener todos los préstamos
   */
  async getAllPrestamos(req, res) {
    try {
      const prestamos = await prestamosService.getAllPrestamos();
      res.json(prestamos);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener préstamos',
        details: error.message 
      });
    }
  }

  /**
   * GET /api/prestamos/activos
   * Obtener préstamos activos (sin fecha de devolución real)
   */
  async getPrestamosActivos(req, res) {
    try {
      const prestamos = await prestamosService.getPrestamosActivos();
      res.json(prestamos);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener préstamos activos',
        details: error.message 
      });
    }
  }

  /**
   * GET /api/prestamos/:id
   * Obtener un préstamo por ID
   */
  async getPrestamoById(req, res) {
    try {
      const { id } = req.params;
      const prestamo = await prestamosService.getPrestamoById(id);
      
      if (!prestamo) {
        return res.status(404).json({ error: 'Préstamo no encontrado' });
      }

      res.json(prestamo);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener préstamo',
        details: error.message 
      });
    }
  }

  /**
   * POST /api/prestamos (Proceso 1: Préstamo de Libro)
   * Crear un nuevo préstamo
   * Excepción: Verifica que el libro esté disponible antes de crear
   */
  async createPrestamo(req, res) {
    try {
      const { socioId, libroId, fechaInicio, fechaDevolucionPrevista } = req.body;

      // Validar campos requeridos
      if (!socioId || !libroId || !fechaInicio || !fechaDevolucionPrevista) {
        return res.status(400).json({ 
          error: 'SocioId, libroId, fechaInicio y fechaDevolucionPrevista son requeridos' 
        });
      }

      // EXCEPCIÓN: El servicio verificará que el libro esté disponible
      const prestamo = await prestamosService.createPrestamo(
        socioId, 
        libroId,
        fechaInicio,
        fechaDevolucionPrevista
      );
      
      res.status(201).json(prestamo);
    } catch (error) {
      // Si el error es porque el libro no está disponible, devolver error 400
      if (error.message.includes('no está disponible')) {
        return res.status(400).json({ 
          error: error.message 
        });
      }

      res.status(500).json({ 
        error: 'Error al crear préstamo',
        details: error.message 
      });
    }
  }

  /**
   * PUT /api/prestamos/devolver/:id (Proceso 2: Devolución de Libro)
   * Devolver un libro
   * Excepción: Si está dañado, crea una multa
   */
  async devolverLibro(req, res) {
    try {
      const { id } = req.params;
      const { estaDañado } = req.body;

      // estaDañado debe ser un booleano
      const dañado = estaDañado === true || estaDañado === 'true';

      // EXCEPCIÓN: Si estaDañado es true, el servicio creará una multa
      const prestamo = await prestamosService.devolverLibro(id, dañado);
      
      res.json({
        message: dañado 
          ? 'Libro devuelto. Se ha generado una multa por daño.' 
          : 'Libro devuelto correctamente',
        prestamo
      });
    } catch (error) {
      if (error.message === 'Préstamo no encontrado') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('ya fue devuelto')) {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ 
        error: 'Error al devolver libro',
        details: error.message 
      });
    }
  }

  /**
   * DELETE /api/prestamos/:id
   * Eliminar un préstamo
   */
  async deletePrestamo(req, res) {
    try {
      const { id } = req.params;
      const result = await prestamosService.deletePrestamo(id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Préstamo no encontrado') {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ 
        error: 'Error al eliminar préstamo',
        details: error.message 
      });
    }
  }
}

export default new PrestamosController();
