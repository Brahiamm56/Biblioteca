import librosService from '../services/librosService.js';

/**
 * Controlador de Libros
 */
class LibrosController {
  /**
   * GET /api/libros
   * Obtener todos los libros
   */
  async getAllLibros(req, res) {
    try {
      const libros = await librosService.getAllLibros();
      res.json(libros);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener libros',
        details: error.message 
      });
    }
  }

  /**
   * GET /api/libros/:id
   * Obtener un libro por ID
   */
  async getLibroById(req, res) {
    try {
      const { id } = req.params;
      const libro = await librosService.getLibroById(id);
      
      if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }

      res.json(libro);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener libro',
        details: error.message 
      });
    }
  }

  /**
   * POST /api/libros
   * Crear un nuevo libro
   */
  async createLibro(req, res) {
    try {
      const { isbn, titulo, autor } = req.body;

      // Validar campos requeridos
      if (!isbn || !titulo || !autor) {
        return res.status(400).json({ 
          error: 'ISBN, título y autor son requeridos' 
        });
      }

      const libro = await librosService.createLibro(isbn, titulo, autor);
      
      res.status(201).json(libro);
    } catch (error) {
      if (error.message.includes('Ya existe un libro con ese ISBN')) {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ 
        error: 'Error al crear libro',
        details: error.message 
      });
    }
  }

  /**
   * PUT /api/libros/:id
   * Actualizar un libro
   */
  async updateLibro(req, res) {
    try {
      const { id } = req.params;
      const { isbn, titulo, autor } = req.body;

      if (!isbn || !titulo || !autor) {
        return res.status(400).json({ 
          error: 'ISBN, título y autor son requeridos' 
        });
      }

      const libro = await librosService.updateLibro(id, isbn, titulo, autor);
      res.json(libro);
    } catch (error) {
      if (error.message.includes('Ya existe otro libro con ese ISBN')) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === 'Libro no encontrado') {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ 
        error: 'Error al actualizar libro',
        details: error.message 
      });
    }
  }

  /**
   * DELETE /api/libros/:id
   * Eliminar un libro
   */
  async deleteLibro(req, res) {
    try {
      const { id } = req.params;
      const result = await librosService.deleteLibro(id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Libro no encontrado') {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ 
        error: 'Error al eliminar libro',
        details: error.message 
      });
    }
  }
}

export default new LibrosController();
