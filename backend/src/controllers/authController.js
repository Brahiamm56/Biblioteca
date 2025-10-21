import { generateToken } from '../middlewares/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'bibliotecario';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

/**
 * Controlador de autenticación
 */
class AuthController {
  /**
   * POST /api/login
   * Login con usuario de prueba
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validar campos requeridos
      if (!username || !password) {
        return res.status(400).json({ 
          error: 'Usuario y contraseña son requeridos' 
        });
      }

      // Verificar credenciales (usuario de prueba)
      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Generar token JWT
      const token = generateToken({ 
        username,
        role: 'bibliotecario' 
      });

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          username,
          role: 'bibliotecario'
        }
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error en el servidor',
        details: error.message 
      });
    }
  }
}

export default new AuthController();
