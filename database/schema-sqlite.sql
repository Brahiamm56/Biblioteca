-- Base de Datos SQLite: Sistema de Gestión de Biblioteca

-- Tabla Socios
CREATE TABLE IF NOT EXISTS Socios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numeroSocio TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    dni TEXT UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Libros
CREATE TABLE IF NOT EXISTS Libros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    isbn TEXT UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    estado TEXT CHECK(estado IN ('disponible', 'prestado')) DEFAULT 'disponible' NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Prestamos
CREATE TABLE IF NOT EXISTS Prestamos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fechaInicio DATE NOT NULL,
    fechaDevolucionPrevista DATE NOT NULL,
    fechaDevolucionReal DATE NULL,
    socioId INTEGER NOT NULL,
    libroId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (socioId) REFERENCES Socios(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (libroId) REFERENCES Libros(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabla Multas
CREATE TABLE IF NOT EXISTS Multas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    motivo TEXT NOT NULL,
    monto REAL NOT NULL,
    fecha DATE NOT NULL,
    prestamoId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prestamoId) REFERENCES Prestamos(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_prestamos_socio ON Prestamos(socioId);
CREATE INDEX IF NOT EXISTS idx_prestamos_libro ON Prestamos(libroId);
CREATE INDEX IF NOT EXISTS idx_multas_prestamo ON Multas(prestamoId);
CREATE INDEX IF NOT EXISTS idx_libros_estado ON Libros(estado);

-- Datos de prueba
-- Insertar algunos libros de ejemplo
INSERT INTO Libros (isbn, titulo, autor, estado) VALUES
('978-0-06-112008-4', 'Cien años de soledad', 'Gabriel García Márquez', 'disponible'),
('978-0-14-017739-8', '1984', 'George Orwell', 'disponible'),
('978-0-7432-7356-5', 'El código Da Vinci', 'Dan Brown', 'disponible'),
('978-0-06-112241-5', 'Matar un ruiseñor', 'Harper Lee', 'disponible'),
('978-0-06-093546-7', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'disponible');

-- Insertar algunos socios de ejemplo
INSERT INTO Socios (numeroSocio, nombre, dni) VALUES
('SOC-0001', 'Juan Pérez', '12345678A'),
('SOC-0002', 'María González', '87654321B'),
('SOC-0003', 'Carlos Rodríguez', '11223344C');
