-- Base de Datos: Sistema de Gestión de Biblioteca
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblioteca;

-- Tabla Socios
CREATE TABLE IF NOT EXISTS Socios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numeroSocio VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla Libros
CREATE TABLE IF NOT EXISTS Libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(50) UNIQUE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    estado ENUM('disponible', 'prestado') DEFAULT 'disponible' NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla Prestamos
CREATE TABLE IF NOT EXISTS Prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fechaInicio DATE NOT NULL,
    fechaDevolucionPrevista DATE NOT NULL,
    fechaDevolucionReal DATE NULL,
    socioId INT NOT NULL,
    libroId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (socioId) REFERENCES Socios(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (libroId) REFERENCES Libros(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla Multas
CREATE TABLE IF NOT EXISTS Multas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    motivo VARCHAR(255) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    prestamoId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (prestamoId) REFERENCES Prestamos(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices adicionales para mejorar el rendimiento
CREATE INDEX idx_prestamos_socio ON Prestamos(socioId);
CREATE INDEX idx_prestamos_libro ON Prestamos(libroId);
CREATE INDEX idx_multas_prestamo ON Multas(prestamoId);
CREATE INDEX idx_libros_estado ON Libros(estado);

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
('SOC-001', 'Juan Pérez', '12345678A'),
('SOC-002', 'María González', '87654321B'),
('SOC-003', 'Carlos Rodríguez', '11223344C');
