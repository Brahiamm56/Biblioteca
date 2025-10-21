import multasService from '../services/multasService.js';

/**
 * Controlador de Multas
 */
class MultasController {
  /**
   * GET /api/multas
   * Obtener todas las multas
   */
  async getAllMultas(req, res) {
    try {
      const multas = await multasService.getAllMultas();
      res.json(multas);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener multas',
        details: error.message 
      });
    }
  }

  /**
   * GET /api/multas/:id
   * Obtener una multa por ID
   */
  async getMultaById(req, res) {
    try {
      const { id } = req.params;
      const multa = await multasService.getMultaById(id);
      
      if (!multa) {
        return res.status(404).json({ error: 'Multa no encontrada' });
      }

      res.json(multa);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener multa',
        details: error.message 
      });
    }
  }

  /**
   * POST /api/multas
   * Crear una nueva multa
   */
  async createMulta(req, res) {
    try {
      const { motivo, monto, fecha, prestamoId } = req.body;

      // Validar campos requeridos
      if (!motivo || !monto || !fecha || !prestamoId) {
        return res.status(400).json({ 
          error: 'Motivo, monto, fecha y prestamoId son requeridos' 
        });
      }

      const multa = await multasService.createMulta(motivo, monto, fecha, prestamoId);
      
      res.status(201).json(multa);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al crear multa',
        details: error.message 
      });
    }
  }

  /**
   * DELETE /api/multas/:id
   * Eliminar una multa
   */
  async deleteMulta(req, res) {
    try {
      const { id } = req.params;
      const result = await multasService.deleteMulta(id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Multa no encontrada') {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ 
        error: 'Error al eliminar multa',
        details: error.message 
      });
    }
  }
}

export default new MultasController();
