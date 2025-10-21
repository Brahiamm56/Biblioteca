import sociosService from '../services/sociosService.js';

/**
 * Controlador de Socios
 */
class SociosController {
  /**
   * GET /api/socios
   * Obtener todos los socios
   */
  async getAllSocios(req, res) {
    try {
      const socios = await sociosService.getAllSocios();
      res.json(socios);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener socios',
        details: error.message 
      });
    }
  }

  /**
   * GET /api/socios/:id
   * Obtener un socio por ID
   */
  async getSocioById(req, res) {
    try {
      const { id } = req.params;
      const socio = await sociosService.getSocioById(id);
      
      if (!socio) {
        return res.status(404).json({ error: 'Socio no encontrado' });
      }

      res.json(socio);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener socio',
        details: error.message 
      });
    }
  }

  /**
   * POST /api/socios (Proceso 3: Alta Socio)
   * Crear un nuevo socio
   * Excepción: Verifica que el DNI no exista antes de crear
   */
  async createSocio(req, res) {
    try {
      const { nombre, dni } = req.body;

      // Validar campos requeridos
      if (!nombre || !dni) {
        return res.status(400).json({ 
          error: 'Nombre y DNI son requeridos' 
        });
      }

      // EXCEPCIÓN: El servicio verificará que el DNI no exista
      const socio = await sociosService.createSocio(nombre, dni);
      
      res.status(201).json(socio);
    } catch (error) {
      // Si el error es por DNI duplicado, devolver error 400
      if (error.message.includes('Ya existe un socio con ese DNI')) {
        return res.status(400).json({ 
          error: error.message 
        });
      }

      res.status(500).json({ 
        error: 'Error al crear socio',
        details: error.message 
      });
    }
  }

  /**
   * PUT /api/socios/:id
   * Actualizar un socio
   */
  async updateSocio(req, res) {
    try {
      const { id } = req.params;
      const { nombre, dni } = req.body;

      if (!nombre || !dni) {
        return res.status(400).json({ 
          error: 'Nombre y DNI son requeridos' 
        });
      }

      const socio = await sociosService.updateSocio(id, nombre, dni);
      res.json(socio);
    } catch (error) {
      if (error.message.includes('Ya existe otro socio con ese DNI')) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === 'Socio no encontrado') {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ 
        error: 'Error al actualizar socio',
        details: error.message 
      });
    }
  }

  /**
   * DELETE /api/socios/:id
   * Eliminar un socio
   */
  async deleteSocio(req, res) {
    try {
      const { id } = req.params;
      const result = await sociosService.deleteSocio(id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Socio no encontrado') {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ 
        error: 'Error al eliminar socio',
        details: error.message 
      });
    }
  }
}

export default new SociosController();
