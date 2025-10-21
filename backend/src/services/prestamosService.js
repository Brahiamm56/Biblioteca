import pool from '../config/database.js';
import librosService from './librosService.js';
import multasService from './multasService.js';

/**
 * Servicio para gestión de Préstamos
 */
class PrestamosService {
  /**
   * Obtener todos los préstamos
   */
  async getAllPrestamos() {
    const [rows] = await pool.query(`
      SELECT 
        p.*,
        s.nombre as socioNombre,
        s.numeroSocio,
        l.titulo as libroTitulo,
        l.isbn,
        l.autor
      FROM Prestamos p
      INNER JOIN Socios s ON p.socioId = s.id
      INNER JOIN Libros l ON p.libroId = l.id
      ORDER BY p.id DESC
    `);
    return rows;
  }

  /**
   * Obtener préstamos activos (sin fecha de devolución real)
   */
  async getPrestamosActivos() {
    const [rows] = await pool.query(`
      SELECT 
        p.*,
        s.nombre as socioNombre,
        s.numeroSocio,
        l.titulo as libroTitulo,
        l.isbn,
        l.autor
      FROM Prestamos p
      INNER JOIN Socios s ON p.socioId = s.id
      INNER JOIN Libros l ON p.libroId = l.id
      WHERE p.fechaDevolucionReal IS NULL
      ORDER BY p.fechaDevolucionPrevista ASC
    `);
    return rows;
  }

  /**
   * Obtener un préstamo por ID
   */
  async getPrestamoById(id) {
    const [rows] = await pool.query(`
      SELECT 
        p.*,
        s.nombre as socioNombre,
        s.numeroSocio,
        l.titulo as libroTitulo,
        l.isbn,
        l.autor
      FROM Prestamos p
      INNER JOIN Socios s ON p.socioId = s.id
      INNER JOIN Libros l ON p.libroId = l.id
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  }

  /**
   * Crear un nuevo préstamo (Proceso 1: Préstamo de Libro)
   * Excepción: Verifica que el libro esté disponible antes de crear
   */
  async createPrestamo(socioId, libroId, fechaInicio, fechaDevolucionPrevista) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // EXCEPCIÓN: Verificar que el libro esté disponible
      const isDisponible = await librosService.isLibroDisponible(libroId);
      if (!isDisponible) {
        throw new Error('El libro no está disponible para préstamo');
      }

      // Crear el préstamo con la fecha de inicio proporcionada
      const [result] = await connection.query(
        'INSERT INTO Prestamos (fechaInicio, fechaDevolucionPrevista, socioId, libroId) VALUES (?, ?, ?, ?)',
        [fechaInicio, fechaDevolucionPrevista, socioId, libroId]
      );

      // Actualizar el estado del libro a 'prestado'
      await connection.query(
        'UPDATE Libros SET estado = ? WHERE id = ?',
        ['prestado', libroId]
      );

      await connection.commit();

      return await this.getPrestamoById(result.insertId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Devolver un libro (Proceso 2: Devolución de Libro)
   * Excepción: Si está dañado, crea una multa
   */
  async devolverLibro(id, estaDañado) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Obtener el préstamo
      const prestamo = await this.getPrestamoById(id);
      if (!prestamo) {
        throw new Error('Préstamo no encontrado');
      }

      if (prestamo.fechaDevolucionReal) {
        throw new Error('Este libro ya fue devuelto');
      }

      // Fecha de devolución real es hoy
      const fechaDevolucionReal = new Date().toISOString().split('T')[0];

      // Actualizar el préstamo
      await connection.query(
        'UPDATE Prestamos SET fechaDevolucionReal = ? WHERE id = ?',
        [fechaDevolucionReal, id]
      );

      // Actualizar el estado del libro a 'disponible'
      await connection.query(
        'UPDATE Libros SET estado = ? WHERE id = ?',
        ['disponible', prestamo.libroId]
      );

      // EXCEPCIÓN: Si está dañado, crear multa
      if (estaDañado) {
        const motivo = 'Libro dañado';
        const monto = 50.00; // Monto fijo de ejemplo
        const fecha = fechaDevolucionReal;

        await connection.query(
          'INSERT INTO Multas (motivo, monto, fecha, prestamoId) VALUES (?, ?, ?, ?)',
          [motivo, monto, fecha, id]
        );
      }

      await connection.commit();

      return await this.getPrestamoById(id);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Eliminar un préstamo
   */
  async deletePrestamo(id) {
    const [result] = await pool.query('DELETE FROM Prestamos WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      throw new Error('Préstamo no encontrado');
    }

    return { message: 'Préstamo eliminado correctamente' };
  }
}

export default new PrestamosService();
