const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./escuela.db'); // Crea o abre la base de datos

// Crear tabla usuarios si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      rol TEXT NOT NULL CHECK (rol IN ('alumno', 'profesor'))
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear tabla usuarios:', err.message);
    } else {
      console.log('✅ Tabla usuarios lista');
    }
  });
});

module.exports = db;
