
// Este script se encarga de poblar la base de datos con datos aleatorios

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./escuela.db');

const faker = require('faker'); 

db.serialize(() => {
  //Crear tablas si no existen
  db.run(`
    CREATE TABLE IF NOT EXISTS profesores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      fecha_registro TEXT NOT NULL
    )
  `);

  // Eliminar datos previos
  db.run('DELETE FROM estudiantes');
  db.run('DELETE FROM profesores');
  db.run('DELETE FROM cursos');


  // Insertar profesores
  for (let i = 0; i < 5; i++) {
    const nombre = faker.name.firstName();
    const apellido = faker.name.lastName();
    db.run(`INSERT INTO profesores (nombre, apellido) VALUES (?, ?)`, [nombre, apellido]);
  }

  // Insertar cursos
  const cursos = ['Matemáticas', 'Historia', 'Biología', 'Programación', 'Economía'];
  cursos.forEach((nombre, index) => {
    db.run(`INSERT INTO cursos (nombre) VALUES (?)`, [nombre]);
  });

  // Insertar estudiantes con fechas variadas
  const meses = [
    '2024-12', '2025-01', '2025-02', '2025-03',
    '2025-04', '2025-05'
  ];

  for (let i = 0; i < 50; i++) {
    const nombre = faker.name.firstName();
    const apellido = faker.name.lastName();
    const mes = faker.helpers.randomize(meses);
    const dia = faker.datatype.number({ min: 1, max: 28 });
    const fecha = `${mes}-${dia.toString().padStart(2, '0')}`;

    db.run(`
      INSERT INTO estudiantes (nombre, apellido, fecha_registro) 
      VALUES (?, ?, ?)
    `, [nombre, apellido, fecha]);
  }

  console.log('Base de datos poblada correctamente.');
});

db.close();
