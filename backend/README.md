# 📚 Backend - Sistema de Gestión de Biblioteca

API REST desarrollada con Node.js, Express y MySQL siguiendo arquitectura de 3 capas.

## 🏗️ Arquitectura

### Capas
1. **Rutas (Routes)** - Define los endpoints y aplica middlewares
2. **Controladores (Controllers)** - Maneja las peticiones HTTP y respuestas
3. **Servicios (Services)** - Contiene la lógica de negocio

## 📦 Dependencias

```json
{
  "express": "^4.18.2",       // Framework web
  "mysql2": "^3.6.5",         // Cliente MySQL
  "jsonwebtoken": "^9.0.2",   // Autenticación JWT
  "cors": "^2.8.5",           // CORS
  "dotenv": "^16.3.1"         // Variables de entorno
}
```

## ⚙️ Configuración

### Variables de Entorno (.env)

```env
# Servidor
PORT=3000

# Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=biblioteca
DB_PORT=3306

# JWT
JWT_SECRET=tu_secreto_muy_seguro

# Usuario de prueba
ADMIN_USERNAME=bibliotecario
ADMIN_PASSWORD=admin123
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo (con watch)
npm run dev

# Iniciar en modo producción
npm start
```

## 🔐 Autenticación

Todas las rutas (excepto `/api/login`) requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

## 📋 Endpoints

### Autenticación
```
POST /api/login
Body: { "username": "bibliotecario", "password": "admin123" }
Response: { "token": "...", "user": {...} }
```

### Socios
```
GET    /api/socios           # Listar todos
GET    /api/socios/:id       # Obtener por ID
POST   /api/socios           # Crear (Proceso 3)
PUT    /api/socios/:id       # Actualizar
DELETE /api/socios/:id       # Eliminar
```

### Libros
```
GET    /api/libros           # Listar todos
GET    /api/libros/:id       # Obtener por ID
POST   /api/libros           # Crear
PUT    /api/libros/:id       # Actualizar
DELETE /api/libros/:id       # Eliminar
```

### Préstamos
```
GET    /api/prestamos              # Listar todos
GET    /api/prestamos/activos      # Listar activos
GET    /api/prestamos/:id          # Obtener por ID
POST   /api/prestamos              # Crear préstamo (Proceso 1)
PUT    /api/prestamos/devolver/:id # Devolver libro (Proceso 2)
DELETE /api/prestamos/:id          # Eliminar
```

### Multas
```
GET    /api/multas           # Listar todas
GET    /api/multas/:id       # Obtener por ID
POST   /api/multas           # Crear
DELETE /api/multas/:id       # Eliminar
```

## 🔄 Lógica de Negocio

### Proceso 1: Préstamo de Libro
**Endpoint:** `POST /api/prestamos`

**Body:**
```json
{
  "socioId": 1,
  "libroId": 2,
  "fechaInicio": "2024-01-15",
  "fechaDevolucionPrevista": "2024-01-29"
}
```

**Validaciones:**
- ✅ Verifica que el libro esté disponible
- ✅ Si no está disponible, retorna error 400

**Acciones:**
1. Crea el registro de préstamo con ambas fechas
2. Actualiza el estado del libro a "prestado"

### Proceso 2: Devolución de Libro
**Endpoint:** `PUT /api/prestamos/devolver/:id`

**Validaciones:**
- ✅ Verifica que el préstamo exista
- ✅ Verifica que no esté ya devuelto

**Acciones:**
1. Actualiza fechaDevolucionReal
2. Cambia el estado del libro a "disponible"
3. **Si estaDañado = true:** Crea automáticamente una multa

### Proceso 3: Alta Socio
**Endpoint:** `POST /api/socios`

**Validaciones:**
- ✅ Verifica que el DNI no exista
- ✅ Si existe, retorna error 400

**Acciones:**
1. Genera un numeroSocio único automáticamente
2. Crea el registro del socio

## 🗄️ Modelo de Datos

### Tabla: Socios
```sql
id INT PRIMARY KEY AUTO_INCREMENT
numeroSocio VARCHAR(50) UNIQUE
nombre VARCHAR(255)
dni VARCHAR(20) UNIQUE
```

### Tabla: Libros
```sql
id INT PRIMARY KEY AUTO_INCREMENT
isbn VARCHAR(50) UNIQUE
titulo VARCHAR(255)
autor VARCHAR(255)
estado ENUM('disponible', 'prestado')
```

### Tabla: Prestamos
```sql
id INT PRIMARY KEY AUTO_INCREMENT
fechaInicio DATE
fechaDevolucionPrevista DATE
fechaDevolucionReal DATE NULL
socioId INT FOREIGN KEY
libroId INT FOREIGN KEY
```

### Tabla: Multas
```sql
id INT PRIMARY KEY AUTO_INCREMENT
motivo VARCHAR(255)
monto DECIMAL(10,2)
fecha DATE
prestamoId INT FOREIGN KEY
```

## 🛡️ Seguridad

- JWT con expiración de 24 horas
- Middleware de autenticación en todas las rutas protegidas
- Validación de datos en controladores
- Manejo de errores centralizado

## 🧪 Testing

```bash
# Probar endpoint de login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"bibliotecario","password":"admin123"}'

# Probar endpoint protegido
curl -X GET http://localhost:3000/api/libros \
  -H "Authorization: Bearer <tu_token>"
```

## 📝 Notas

- Usar transacciones SQL para operaciones críticas (préstamos, devoluciones)
- Los servicios manejan la lógica de negocio
- Los controladores solo validan entrada y formatean respuestas
- Las rutas aplican middlewares y delegan a controladores
