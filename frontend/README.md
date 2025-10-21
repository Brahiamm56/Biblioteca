# 📚 Frontend - Sistema de Gestión de Biblioteca

Aplicación web moderna desarrollada con React, Material-UI y Vite.

## 🎨 Características

- ✅ Diseño responsive con Material-UI
- ✅ Autenticación con Context API
- ✅ Navegación con React Router
- ✅ Formularios interactivos
- ✅ Tablas dinámicas
- ✅ Notificaciones de éxito/error

## 📦 Dependencias

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "axios": "^1.6.2",
  "@mui/material": "^5.15.0",
  "@mui/icons-material": "^5.15.0",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0"
}
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.jsx      # Layout con navegación
│   └── ProtectedRoute.jsx
├── context/            # Contextos de React
│   └── AuthContext.jsx
├── pages/              # Páginas principales
│   ├── Login.jsx       # Página de login
│   ├── Dashboard.jsx   # Dashboard principal
│   ├── Socios.jsx      # Gestión de socios
│   └── Libros.jsx      # Gestión de libros
├── services/           # Servicios de API
│   └── api.js
├── App.jsx             # Componente raíz
└── main.jsx            # Punto de entrada
```

## 🔐 Autenticación

El sistema usa JWT almacenado en `localStorage`:

```javascript
// Login
const token = await authService.login({ username, password });
localStorage.setItem('token', token);

// Logout
localStorage.removeItem('token');

// Verificar autenticación
const isAuth = authService.isAuthenticated();
```

## 📄 Páginas

### 1. Login (`/login`)
- Formulario de autenticación
- Credenciales de prueba visibles
- Redirección automática al dashboard

### 2. Dashboard (`/`)
**Proceso 1: Prestar Libro**
- Seleccionar socio
- Seleccionar libro disponible
- Fecha de devolución prevista
- Validación de disponibilidad

**Proceso 2: Devolver Libro**
- Seleccionar préstamo activo
- Checkbox para libro dañado
- Generación automática de multa si está dañado

**Tabla de Préstamos Activos**
- Lista de préstamos sin devolver
- Estados visuales con chips

### 3. Socios (`/socios`)
**Proceso 3: Alta Socio**
- Formulario de registro
- Validación de DNI único
- Generación automática de número de socio

**Tabla de Socios**
- Lista completa
- Edición inline
- Eliminación con confirmación

### 4. Libros (`/libros`)
- Formulario de alta
- Tabla con estados (disponible/prestado)
- CRUD completo

## 🎨 Componentes Principales

### Layout
```jsx
<Layout>
  {children}
</Layout>
```
- AppBar superior con logout
- Drawer lateral con navegación
- Responsive (mobile/desktop)

### ProtectedRoute
```jsx
<ProtectedRoute>
  <Component />
</ProtectedRoute>
```
- Verifica autenticación
- Redirecciona a login si no está autenticado

## 🌐 API Service

```javascript
// Configuración de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Servicios disponibles
authService.login(credentials)
sociosService.getAll()
sociosService.create(data)
librosService.getAll()
prestamosService.create(data)
prestamosService.devolver(id, estaDañado)
```

## 🎨 Tema Personalizado

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    success: { main: '#4caf50' }
  }
});
```

## 📱 Responsive Design

- Mobile: Drawer temporal (hamburger menu)
- Desktop: Drawer permanente
- Tablas con scroll horizontal en móvil

## 🔄 Flujo de Autenticación

```
1. Usuario accede a ruta protegida
2. ProtectedRoute verifica token en localStorage
3. Si no hay token → redirect a /login
4. Si hay token → muestra contenido
5. En cada petición API, se envía token en header
6. Si API responde 401 → logout automático
```

## 🎯 Mejores Prácticas Implementadas

- ✅ Separación de concerns (UI, lógica, API)
- ✅ Context API para estado global
- ✅ Interceptores de Axios para autenticación
- ✅ Manejo centralizado de errores
- ✅ Feedback visual (alerts, loading states)
- ✅ Validación de formularios
- ✅ Confirmaciones antes de acciones destructivas

## 🚀 Despliegue

```bash
# Build de producción
npm run build

# La carpeta dist/ contiene los archivos estáticos
# Pueden ser servidos con cualquier servidor web
```

## 🐛 Debug

```bash
# Ver logs del servidor de desarrollo
npm run dev

# Inspeccionar en navegador
# React DevTools
# Network tab para peticiones API
```

## 📝 Notas

- El proxy en `vite.config.js` redirige `/api` a `http://localhost:3000`
- Material-UI maneja estilos con Emotion
- React Router v6 usa hooks como `useNavigate`, `useLocation`
- Axios interceptors automatizan el manejo de tokens
