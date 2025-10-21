import pool from '../config/database.js';

/**
 * Servicio para gestión de Socios
 */
class SociosService {
  /**
   * Obtener todos los socios
   */
  async getAllSocios() {
    const [rows] = await pool.query('SELECT * FROM Socios ORDER BY id DESC');
    return rows;
  }

  /**
   * Obtener un socio por ID
   */
  async getSocioById(id) {
    const [rows] = await pool.query('SELECT * FROM Socios WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * Obtener un socio por DNI
   */
  async getSocioByDni(dni) {
    const [rows] = await pool.query('SELECT * FROM Socios WHERE dni = ?', [dni]);
    return rows[0];
  }

  /**
   * Crear un nuevo socio
   * Genera automáticamente un numeroSocio único
   */
  async createSocio(nombre, dni) {
    try {
      // Verificar si el DNI ya existe
      const existingSocio = await this.getSocioByDni(dni);
      if (existingSocio) {
        throw new Error('Ya existe un socio con ese DNI');
      }

      // Generar número de socio único
      const numeroSocio = await this.generateNumeroSocio();
      console.log('📝 Creando socio:', { numeroSocio, nombre, dni });

      const [result] = await pool.query(
        'INSERT INTO Socios (numeroSocio, nombre, dni) VALUES (?, ?, ?)',
        [numeroSocio, nombre, dni]
      );

      console.log('✅ Socio creado, result:', result);

      return {
        id: result.insertId,
        numeroSocio,
        nombre,
        dni
      };
    } catch (error) {
      console.error('❌ Error en createSocio:', error);
      throw error;
    }
  }

  /**
   * Generar un número de socio único
   */
  async generateNumeroSocio() {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM Socios'
    );
    const count = (rows[0]?.count || rows[0]?.['COUNT(*)'] || 0) + 1;
    return `SOC-${String(count).padStart(4, '0')}`;
  }

  /**
   * Actualizar un socio
   */
  async updateSocio(id, nombre, dni) {
    // Verificar si el DNI ya existe en otro socio
    const [existingRows] = await pool.query(
      'SELECT * FROM Socios WHERE dni = ? AND id != ?',
      [dni, id]
    );
    
    if (existingRows.length > 0) {
      throw new Error('Ya existe otro socio con ese DNI');
    }

    const [result] = await pool.query(
      'UPDATE Socios SET nombre = ?, dni = ? WHERE id = ?',
      [nombre, dni, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Socio no encontrado');
    }

    return await this.getSocioById(id);
  }

  /**
   * Eliminar un socio
   */
  async deleteSocio(id) {
    const [result] = await pool.query('DELETE FROM Socios WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      throw new Error('Socio no encontrado');
    }

    return { message: 'Socio eliminado correctamente' };
  }
}

export default new SociosService();
