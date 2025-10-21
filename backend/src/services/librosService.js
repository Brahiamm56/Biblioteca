import pool from '../config/database.js';

/**
 * Servicio para gestión de Libros
 */
class LibrosService {
  /**
   * Obtener todos los libros
   */
  async getAllLibros() {
    const [rows] = await pool.query('SELECT * FROM Libros ORDER BY id DESC');
    return rows;
  }

  /**
   * Obtener un libro por ID
   */
  async getLibroById(id) {
    const [rows] = await pool.query('SELECT * FROM Libros WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * Obtener un libro por ISBN
   */
  async getLibroByIsbn(isbn) {
    const [rows] = await pool.query('SELECT * FROM Libros WHERE isbn = ?', [isbn]);
    return rows[0];
  }

  /**
   * Crear un nuevo libro
   */
  async createLibro(isbn, titulo, autor) {
    // Verificar si el ISBN ya existe
    const existingLibro = await this.getLibroByIsbn(isbn);
    if (existingLibro) {
      throw new Error('Ya existe un libro con ese ISBN');
    }

    const [result] = await pool.query(
      'INSERT INTO Libros (isbn, titulo, autor, estado) VALUES (?, ?, ?, ?)',
      [isbn, titulo, autor, 'disponible']
    );

    return {
      id: result.insertId,
      isbn,
      titulo,
      autor,
      estado: 'disponible'
    };
  }

  /**
   * Actualizar un libro
   */
  async updateLibro(id, isbn, titulo, autor) {
    // Verificar si el ISBN ya existe en otro libro
    const [existingRows] = await pool.query(
      'SELECT * FROM Libros WHERE isbn = ? AND id != ?',
      [isbn, id]
    );
    
    if (existingRows.length > 0) {
      throw new Error('Ya existe otro libro con ese ISBN');
    }

    const [result] = await pool.query(
      'UPDATE Libros SET isbn = ?, titulo = ?, autor = ? WHERE id = ?',
      [isbn, titulo, autor, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Libro no encontrado');
    }

    return await this.getLibroById(id);
  }

  /**
   * Actualizar el estado de un libro
   */
  async updateEstadoLibro(id, estado) {
    const [result] = await pool.query(
      'UPDATE Libros SET estado = ? WHERE id = ?',
      [estado, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Libro no encontrado');
    }

    return await this.getLibroById(id);
  }

  /**
   * Eliminar un libro
   */
  async deleteLibro(id) {
    const [result] = await pool.query('DELETE FROM Libros WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      throw new Error('Libro no encontrado');
    }

    return { message: 'Libro eliminado correctamente' };
  }

  /**
   * Verificar si un libro está disponible
   */
  async isLibroDisponible(id) {
    const libro = await this.getLibroById(id);
    return libro && libro.estado === 'disponible';
  }
}

export default new LibrosService();
