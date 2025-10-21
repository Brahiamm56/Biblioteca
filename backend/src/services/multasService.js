import pool from '../config/database.js';

/**
 * Servicio para gestión de Multas
 */
class MultasService {
  /**
   * Obtener todas las multas
   */
  async getAllMultas() {
    const [rows] = await pool.query(`
      SELECT 
        m.*,
        p.fechaInicio,
        p.fechaDevolucionReal,
        s.nombre as socioNombre,
        s.numeroSocio,
        l.titulo as libroTitulo
      FROM Multas m
      INNER JOIN Prestamos p ON m.prestamoId = p.id
      INNER JOIN Socios s ON p.socioId = s.id
      INNER JOIN Libros l ON p.libroId = l.id
      ORDER BY m.id DESC
    `);
    return rows;
  }

  /**
   * Obtener una multa por ID
   */
  async getMultaById(id) {
    const [rows] = await pool.query(`
      SELECT 
        m.*,
        p.fechaInicio,
        p.fechaDevolucionReal,
        s.nombre as socioNombre,
        s.numeroSocio,
        l.titulo as libroTitulo
      FROM Multas m
      INNER JOIN Prestamos p ON m.prestamoId = p.id
      INNER JOIN Socios s ON p.socioId = s.id
      INNER JOIN Libros l ON p.libroId = l.id
      WHERE m.id = ?
    `, [id]);
    return rows[0];
  }

  /**
   * Crear una nueva multa
   */
  async createMulta(motivo, monto, fecha, prestamoId) {
    const [result] = await pool.query(
      'INSERT INTO Multas (motivo, monto, fecha, prestamoId) VALUES (?, ?, ?, ?)',
      [motivo, monto, fecha, prestamoId]
    );

    return {
      id: result.insertId,
      motivo,
      monto,
      fecha,
      prestamoId
    };
  }

  /**
   * Obtener multas por préstamo
   */
  async getMultasByPrestamo(prestamoId) {
    const [rows] = await pool.query(
      'SELECT * FROM Multas WHERE prestamoId = ?',
      [prestamoId]
    );
    return rows;
  }

  /**
   * Eliminar una multa
   */
  async deleteMulta(id) {
    const [result] = await pool.query('DELETE FROM Multas WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      throw new Error('Multa no encontrada');
    }

    return { message: 'Multa eliminada correctamente' };
  }
}

export default new MultasService();
