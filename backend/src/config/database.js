import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta a la base de datos
const dbPath = join(__dirname, '../../../database/biblioteca.db');
const sqlSchemaPath = join(__dirname, '../../../database/schema-sqlite.sql');

// Crear la base de datos
const db = new sqlite3.Database(dbPath);

// Promisificar métodos de sqlite3
const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));
const dbExec = promisify(db.exec.bind(db));

// Inicializar la base de datos (IIFE asíncrono)
(async () => {
  try {
    // Configurar SQLite para mejor concurrencia
    await dbRun('PRAGMA journal_mode = WAL');
    await dbRun('PRAGMA busy_timeout = 5000');
    await dbRun('PRAGMA foreign_keys = ON');

    // Verificar si la base de datos está vacía
    const tableCount = await dbGet("SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    
    if (tableCount.count === 0) {
      console.log('📦 Inicializando base de datos...');
      const schema = fs.readFileSync(sqlSchemaPath, 'utf8');
      await dbExec(schema);
      console.log('✅ Base de datos inicializada correctamente');
    } else {
      console.log('✅ Conexión exitosa a la base de datos SQLite');
    }
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error.message);
  }
})();

// Wrapper para mantener compatibilidad con sintaxis de mysql2
const dbWrapper = {
  // Simular pool.query de mysql2
  query: async (sql, params = []) => {
    return new Promise((resolve, reject) => {
      const isSelect = sql.trim().toUpperCase().startsWith('SELECT');
      
      if (isSelect) {
        db.all(sql, params, (err, rows) => {
          if (err) reject(err);
          else resolve([rows]);
        });
      } else {
        db.run(sql, params, function(err) {
          if (err) reject(err);
          else resolve([{ insertId: this.lastID || 0, affectedRows: this.changes || 0 }]);
        });
      }
    });
  },
  
  // Simular pool.getConnection() para transacciones
  getConnection: async () => {
    return {
      query: async (sql, params = []) => {
        return new Promise((resolve, reject) => {
          const isSelect = sql.trim().toUpperCase().startsWith('SELECT');
          
          if (isSelect) {
            db.all(sql, params, (err, rows) => {
              if (err) reject(err);
              else resolve([rows]);
            });
          } else {
            db.run(sql, params, function(err) {
              if (err) reject(err);
              else resolve([{ insertId: this.lastID || 0, affectedRows: this.changes || 0 }]);
            });
          }
        });
      },
      beginTransaction: async () => {
        return new Promise((resolve, reject) => {
          db.run('BEGIN TRANSACTION', (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      },
      commit: async () => {
        return new Promise((resolve, reject) => {
          db.run('COMMIT', (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      },
      rollback: async () => {
        return new Promise((resolve, reject) => {
          db.run('ROLLBACK', (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      },
      release: () => {
        // En SQLite no necesitamos liberar conexiones
      }
    };
  }
};

export default dbWrapper;
