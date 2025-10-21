# 🚀 Instalación con SQLite - Sistema de Gestión de Biblioteca

El proyecto ha sido **convertido a SQLite** para mayor simplicidad. ¡No necesitas instalar MySQL!

## ✅ Ventajas de SQLite

- ✅ **No requiere instalación** de servidor de base de datos
- ✅ **Base de datos en un archivo** (`database/biblioteca.db`)
- ✅ **Creación automática** al iniciar el backend
- ✅ **Datos de prueba incluidos** automáticamente
- ✅ **Ideal para desarrollo** y proyectos pequeños

## 📋 Requisitos

Solo necesitas:
- ✅ **Node.js** v16 o superior ([Descargar](https://nodejs.org/))

## 🚀 Instalación Paso a Paso

### 1️⃣ Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias (incluye better-sqlite3)
npm install

# Iniciar el servidor
npm run dev
```

✅ **La base de datos se crea automáticamente** en `database/biblioteca.db`

Verás en consola:
```
📦 Inicializando base de datos...
✅ Base de datos inicializada correctamente
✅ Conexión exitosa a la base de datos SQLite
🚀 Servidor iniciado en: http://localhost:3000
```

### 2️⃣ Frontend

**En una NUEVA terminal:**

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor
npm run dev
```

Abre: `http://localhost:5173`

### 3️⃣ Iniciar Sesión

**Credenciales:**
- Usuario: `bibliotecario`
- Contraseña: `admin123`

## 📁 Archivos de Base de Datos

- **`database/schema-sqlite.sql`** - Script SQL para SQLite
- **`database/biblioteca.db`** - Base de datos (se crea automáticamente)

## 🔍 Ver la Base de Datos

Puedes usar **DB Browser for SQLite** para explorar la base de datos:

1. Abrir DB Browser for SQLite
2. File → Open Database
3. Seleccionar: `database/biblioteca.db`
4. ¡Listo! Puedes ver tablas y datos

## 🛠️ Configuración (Opcional)

El archivo `backend/.env` ya no necesita configuración de base de datos:

```env
PORT=3000
JWT_SECRET=biblioteca_secret_key_2024
ADMIN_USERNAME=bibliotecario
ADMIN_PASSWORD=admin123
```

## ✅ Verificación

### Backend funcionando:
- [ ] Terminal muestra "✅ Conexión exitosa a la base de datos SQLite"
- [ ] Archivo `database/biblioteca.db` se creó automáticamente
- [ ] `http://localhost:3000` muestra lista de endpoints

### Frontend funcionando:
- [ ] `http://localhost:5173` muestra login
- [ ] Puedes iniciar sesión
- [ ] Dashboard muestra formularios

## 📊 Datos de Prueba Incluidos

La base de datos incluye automáticamente:

**Libros:**
- Cien años de soledad
- 1984
- El código Da Vinci
- Matar un ruiseñor
- Don Quijote de la Mancha

**Socios:**
- Juan Pérez (DNI: 12345678A)
- María González (DNI: 87654321B)
- Carlos Rodríguez (DNI: 11223344C)

## 🔄 Reiniciar Base de Datos

Si quieres empezar de cero:

```bash
# Detener el backend (Ctrl+C)

# Eliminar la base de datos
cd database
del biblioteca.db   # Windows
# o
rm biblioteca.db    # Linux/Mac

# Reiniciar el backend
cd ../backend
npm run dev

# La base de datos se recreará automáticamente
```

## 🐛 Solución de Problemas

### Error: "Cannot find module 'better-sqlite3'"

**Solución:**
```bash
cd backend
npm install
```

### Error: "SQLITE_CANTOPEN"

**Causa:** No se puede crear el archivo de base de datos

**Solución:**
1. Verificar que existe la carpeta `database/`
2. Verificar permisos de escritura
3. Ejecutar desde la raíz del proyecto

### La base de datos no tiene datos

**Solución:**
1. Eliminar `database/biblioteca.db`
2. Reiniciar el backend
3. Se recreará con datos de prueba

## 💡 Ventajas vs MySQL

| Característica | SQLite | MySQL |
|---------------|--------|-------|
| Instalación | No necesita | Requiere servidor |
| Configuración | Automática | Manual |
| Portabilidad | 1 archivo | Servidor |
| Ideal para | Desarrollo, demos | Producción |
| Rendimiento | Excelente para < 1M registros | Mejor para grandes volúmenes |

## 📝 Notas Importantes

1. **Archivo único:** Toda la base de datos está en `database/biblioteca.db`
2. **Backup fácil:** Solo copia ese archivo
3. **Portátil:** Puedes mover el proyecto a otra máquina sin configurar nada
4. **Desarrollo:** Perfecto para desarrollo y pruebas
5. **Producción:** Para producción considera PostgreSQL o MySQL

## 🎯 Próximos Pasos

1. ✅ Backend corriendo en `http://localhost:3000`
2. ✅ Frontend corriendo en `http://localhost:5173`
3. ✅ Inicia sesión con `bibliotecario` / `admin123`
4. ✅ Explora las funcionalidades del sistema

## 📚 Recursos

- **DB Browser for SQLite:** https://sqlitebrowser.org/
- **SQLite Documentation:** https://www.sqlite.org/docs.html
- **Better-sqlite3:** https://github.com/WiseLibs/better-sqlite3

---

✅ **¡Listo!** Tu sistema está funcionando con SQLite, sin necesidad de MySQL.
