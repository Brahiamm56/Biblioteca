# 📚 Sistema de Gestión de Biblioteca

Sistema completo de gestión de biblioteca con arquitectura Full-Stack (React + Node.js + SQLite).

## 🎯 Características Principales

### Procesos Implementados
1. **Proceso 1: Préstamo de Libro** - Registrar préstamos verificando disponibilidad
2. **Proceso 2: Devolución de Libro** - Devolver libros con detección de daños y generación automática de multas
3. **Proceso 3: Alta de Socio** - Registrar nuevos socios con validación de DNI único

### Funcionalidades
- ✅ Autenticación con JWT
- ✅ Gestión completa de Socios (CRUD)
- ✅ Gestión completa de Libros (CRUD)
- ✅ Sistema de Préstamos y Devoluciones
- ✅ Sistema automático de Multas
- ✅ Interfaz moderna con Material-UI
- ✅ Arquitectura de 3 capas (Rutas, Controladores, Servicios)

## 📁 Estructura del Proyecto

```
BibiliotecaWeb/
├── database/
│   └── schema.sql              # Script SQL para crear la base de datos
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js     # Configuración de MySQL
│   │   ├── middlewares/
│   │   │   └── auth.js         # Middleware de autenticación JWT
│   │   ├── services/           # Capa de Servicios (lógica de negocio)
│   │   │   ├── sociosService.js
│   │   │   ├── librosService.js
│   │   │   ├── prestamosService.js
│   │   │   └── multasService.js
│   │   ├── controllers/        # Capa de Controladores
│   │   │   ├── authController.js
│   │   │   ├── sociosController.js
│   │   │   ├── librosController.js
│   │   │   ├── prestamosController.js
│   │   │   └── multasController.js
│   │   ├── routes/             # Capa de Rutas
│   │   │   ├── authRoutes.js
│   │   │   ├── sociosRoutes.js
│   │   │   ├── librosRoutes.js
│   │   │   ├── prestamosRoutes.js
│   │   │   └── multasRoutes.js
│   │   └── index.js            # Punto de entrada del servidor
│   ├── .env                    # Variables de entorno
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx      # Layout principal con navegación
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx # Contexto de autenticación
    │   ├── pages/
    │   │   ├── Login.jsx       # Página de login
    │   │   ├── Dashboard.jsx   # Dashboard (Préstamos y Devoluciones)
    │   │   ├── Socios.jsx      # Gestión de Socios
    │   │   └── Libros.jsx      # Gestión de Libros
    │   ├── services/
    │   │   └── api.js          # Servicios de API (Axios)
    │   ├── App.jsx             # Componente principal
    │   └── main.jsx            # Punto de entrada
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v16 o superior)
- npm o yarn

**Nota:** ✅ La base de datos SQLite se crea automáticamente. No necesitas instalar MySQL.

### 1. Configurar Base de Datos

✅ **No hay configuración necesaria.** La base de datos SQLite se crea automáticamente al iniciar el backend.

Si deseas ver el schema SQL: `database/schema-sqlite.sql`

### 2. Configurar Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Iniciar el servidor (la base de datos se crea automáticamente)
npm run dev
```

El backend estará disponible en: `http://localhost:3000`

### 3. Configurar Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🔐 Credenciales de Prueba

**Usuario:** bibliotecario  
**Contraseña:** admin123

## 📋 API Endpoints

### Autenticación
- `POST /api/login` - Login

### Socios
- `GET /api/socios` - Obtener todos los socios
- `POST /api/socios` - Crear socio (Proceso 3)
- `PUT /api/socios/:id` - Actualizar socio
- `DELETE /api/socios/:id` - Eliminar socio

### Libros
- `GET /api/libros` - Obtener todos los libros
- `POST /api/libros` - Crear libro
- `PUT /api/libros/:id` - Actualizar libro
- `DELETE /api/libros/:id` - Eliminar libro

### Préstamos
- `GET /api/prestamos/activos` - Obtener préstamos activos
- `POST /api/prestamos` - Crear préstamo (Proceso 1)
- `PUT /api/prestamos/devolver/:id` - Devolver libro (Proceso 2)

### Multas
- `GET /api/multas` - Obtener todas las multas

## 🛡️ Seguridad

- Todas las rutas (excepto `/api/login`) están protegidas con autenticación JWT
- Los tokens tienen una duración de 24 horas
- Las contraseñas y secretos deben cambiarse en producción

## 🗃️ Modelo de Datos

### Socios
- `id`, `numeroSocio`, `nombre`, `dni`

### Libros
- `id`, `isbn`, `titulo`, `autor`, `estado` (disponible/prestado)

### Préstamos
- `id`, `fechaInicio`, `fechaDevolucionPrevista`, `fechaDevolucionReal`, `socioId`, `libroId`

### Multas
- `id`, `motivo`, `monto`, `fecha`, `prestamoId`

## 🎨 Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- JSON Web Token (JWT)
- CORS
- dotenv

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- React Router DOM
- Axios

## 📝 Notas Importantes

1. **Validaciones Implementadas:**
   - DNI único al crear socios
   - ISBN único al crear libros
   - Verificación de disponibilidad antes de prestar
   - Generación automática de multas si el libro está dañado

2. **Arquitectura:**
   - Backend: Arquitectura de 3 capas (Rutas → Controladores → Servicios)
   - Frontend: Componentes reutilizables con Context API para autenticación

3. **Datos de Prueba:**
   - El script SQL incluye datos de ejemplo (libros y socios)

## 📞 Soporte

Para problemas o consultas, revisar:
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`

---

Desarrollado con ❤️ para la gestión eficiente de bibliotecas
