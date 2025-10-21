import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import sociosRoutes from './routes/sociosRoutes.js';
import librosRoutes from './routes/librosRoutes.js';
import prestamosRoutes from './routes/prestamosRoutes.js';
import multasRoutes from './routes/multasRoutes.js';

// Importar configuración de base de datos (para verificar conexión al iniciar)
import './config/database.js';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requests (desarrollo)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api', authRoutes);
app.use('/api/socios', sociosRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/multas', multasRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Sistema de Gestión de Biblioteca',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /api/login'
      },
      socios: {
        getAll: 'GET /api/socios',
        getById: 'GET /api/socios/:id',
        create: 'POST /api/socios',
        update: 'PUT /api/socios/:id',
        delete: 'DELETE /api/socios/:id'
      },
      libros: {
        getAll: 'GET /api/libros',
        getById: 'GET /api/libros/:id',
        create: 'POST /api/libros',
        update: 'PUT /api/libros/:id',
        delete: 'DELETE /api/libros/:id'
      },
      prestamos: {
        getAll: 'GET /api/prestamos',
        getActivos: 'GET /api/prestamos/activos',
        getById: 'GET /api/prestamos/:id',
        create: 'POST /api/prestamos',
        devolver: 'PUT /api/prestamos/devolver/:id',
        delete: 'DELETE /api/prestamos/:id'
      },
      multas: {
        getAll: 'GET /api/multas',
        getById: 'GET /api/multas/:id',
        create: 'POST /api/multas',
        delete: 'DELETE /api/multas/:id'
      }
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    details: err.message 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   📚 Sistema de Gestión de Biblioteca - API          ║
║                                                       ║
║   🚀 Servidor iniciado en: http://localhost:${PORT}     ║
║   📅 Fecha: ${new Date().toLocaleString('es-ES')}           ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
