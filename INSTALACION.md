# 🚀 Guía de Instalación - Sistema de Gestión de Biblioteca

Esta guía te ayudará a poner en marcha el sistema paso a paso.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- ✅ **Node.js** v16 o superior ([Descargar](https://nodejs.org/))
- ✅ **MySQL** v8.0 o superior ([Descargar](https://dev.mysql.com/downloads/))
- ✅ **Git** (opcional, para control de versiones)

Verifica las instalaciones:
```bash
node --version
npm --version
mysql --version
```

## 📦 Paso 1: Configurar la Base de Datos

### 1.1 Iniciar MySQL

**Windows (PowerShell):**
```powershell
# Si MySQL está como servicio
net start MySQL80

# O abrir MySQL Workbench
```

**Línea de comandos:**
```bash
mysql -u root -p
```

### 1.2 Ejecutar el Script SQL

**Opción A: Desde MySQL CLI**
```sql
source C:/Users/Iserre/OneDrive/Escritorio/Proyectos/BibiliotecaWeb/database/schema.sql
```

**Opción B: Copiar y pegar**
1. Abrir `database/schema.sql`
2. Copiar todo el contenido
3. Pegar en MySQL Workbench o consola MySQL
4. Ejecutar

### 1.3 Verificar la Instalación

```sql
USE biblioteca;
SHOW TABLES;
SELECT * FROM Libros;
SELECT * FROM Socios;
```

Deberías ver las 4 tablas y algunos datos de prueba.

## 🔧 Paso 2: Configurar el Backend

### 2.1 Instalar Dependencias

```bash
# Navegar al directorio del backend
cd C:/Users/Iserre/OneDrive/Escritorio/Proyectos/BibiliotecaWeb/backend

# Instalar dependencias
npm install
```

Esto instalará:
- express
- mysql2
- jsonwebtoken
- cors
- dotenv

### 2.2 Configurar Variables de Entorno

El archivo `.env` ya está creado. **Verificar y ajustar** las credenciales de MySQL:

```env
# backend/.env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=         # ⚠️ IMPORTANTE: Poner tu contraseña de MySQL aquí
DB_NAME=biblioteca
DB_PORT=3306

JWT_SECRET=biblioteca_secret_key_2024
ADMIN_USERNAME=bibliotecario
ADMIN_PASSWORD=admin123
```

### 2.3 Iniciar el Servidor Backend

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# O modo normal
npm start
```

✅ **Verificar:** Deberías ver en consola:
```
✅ Conexión exitosa a la base de datos MySQL
🚀 Servidor iniciado en: http://localhost:3000
```

### 2.4 Probar el Backend

Abrir navegador en: `http://localhost:3000`

Deberías ver un JSON con la lista de endpoints disponibles.

## 🎨 Paso 3: Configurar el Frontend

### 3.1 Instalar Dependencias

**Abrir una NUEVA terminal** (mantener el backend ejecutándose):

```bash
# Navegar al directorio del frontend
cd C:/Users/Iserre/OneDrive/Escritorio/Proyectos/BibiliotecaWeb/frontend

# Instalar dependencias
npm install
```

Esto instalará:
- react
- react-dom
- react-router-dom
- axios
- @mui/material
- @mui/icons-material
- vite

### 3.2 Iniciar el Servidor Frontend

```bash
npm run dev
```

✅ **Verificar:** Deberías ver:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3.3 Abrir la Aplicación

Abrir navegador en: `http://localhost:5173`

## 🔐 Paso 4: Iniciar Sesión

### Credenciales de Prueba:
- **Usuario:** `bibliotecario`
- **Contraseña:** `admin123`

## ✅ Verificación Final

### Backend (Puerto 3000)
- [ ] Servidor iniciado sin errores
- [ ] Conexión a MySQL exitosa
- [ ] `http://localhost:3000` muestra JSON de endpoints

### Frontend (Puerto 5173)
- [ ] Servidor iniciado sin errores
- [ ] `http://localhost:5173` muestra página de login
- [ ] Puedes iniciar sesión correctamente

### Funcionalidades
- [ ] Dashboard muestra formularios de préstamo y devolución
- [ ] Página de Socios muestra tabla y formulario
- [ ] Página de Libros muestra libros con estados
- [ ] Puedes crear un nuevo socio
- [ ] Puedes registrar un préstamo
- [ ] Puedes devolver un libro

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"

**Causa:** Credenciales incorrectas o MySQL no está corriendo

**Solución:**
1. Verificar que MySQL está corriendo: `net start MySQL80`
2. Verificar credenciales en `backend/.env`
3. Probar conexión manual: `mysql -u root -p`

### Error: "Port 3000 already in use"

**Causa:** Otro proceso está usando el puerto 3000

**Solución:**
1. Cambiar puerto en `backend/.env`: `PORT=3001`
2. Actualizar URL en `frontend/src/services/api.js`

### Error: "CORS policy"

**Causa:** Frontend y backend en diferentes orígenes

**Solución:**
- Verificar que CORS está habilitado en `backend/src/index.js`
- Verificar que la URL de la API es correcta en `frontend/src/services/api.js`

### Error: "npm install fails"

**Causa:** Problemas de red o versión de Node

**Solución:**
```bash
# Limpiar caché
npm cache clean --force

# Reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Socio ya existe con ese DNI"

**Causa:** Validación funcionando correctamente

**Solución:**
- Esto es esperado, usar un DNI diferente

## 📝 Comandos Útiles

### Backend
```bash
cd backend
npm run dev          # Iniciar en modo desarrollo
npm start           # Iniciar en modo producción
```

### Frontend
```bash
cd frontend
npm run dev         # Iniciar servidor de desarrollo
npm run build       # Compilar para producción
npm run preview     # Previsualizar build
```

### Base de Datos
```sql
-- Ver todos los préstamos
SELECT * FROM Prestamos;

-- Ver libros disponibles
SELECT * FROM Libros WHERE estado = 'disponible';

-- Ver multas generadas
SELECT * FROM Multas;

-- Limpiar datos de prueba
DELETE FROM Multas;
DELETE FROM Prestamos;
DELETE FROM Socios WHERE id > 3;
DELETE FROM Libros WHERE id > 5;
```

## 🎯 Próximos Pasos

1. **Explorar el Dashboard:** Registra préstamos y devoluciones
2. **Gestionar Socios:** Agrega nuevos socios desde `/socios`
3. **Gestionar Libros:** Agrega libros desde `/libros`
4. **Probar Validaciones:** Intenta prestar un libro ya prestado
5. **Probar Multas:** Devuelve un libro marcándolo como dañado

## 📚 Recursos Adicionales

- **README Principal:** `README.md`
- **Backend README:** `backend/README.md`
- **Frontend README:** `frontend/README.md`
- **Script SQL:** `database/schema.sql`

## 💡 Consejos

1. **Mantén dos terminales abiertas:** Una para backend, otra para frontend
2. **Usa MySQL Workbench:** Facilita la gestión de la base de datos
3. **Revisa los logs:** Ambos servidores muestran logs útiles en consola
4. **Usa las DevTools:** F12 en el navegador para ver errores de red

---

✅ **¡Listo!** Tu sistema de gestión de biblioteca está funcionando.

Si encuentras algún problema, revisa la sección de **Solución de Problemas** o los archivos README específicos.
