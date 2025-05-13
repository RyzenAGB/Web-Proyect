const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint para KPIs destacados
router.get('/kpis', (req, res) => {
  db.get(`
    SELECT 
      (SELECT COUNT(*) FROM estudiantes) as totalEstudiantes,
      (SELECT COUNT(*) FROM cursos) as totalCursos,
      (SELECT COUNT(*) FROM profesores) as totalProfesores
  `, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Endpoint para registros por mes (para gráficas)
router.get('/registros', (req, res) => {
  db.all(`
    SELECT strftime('%Y-%m', fecha_registro) as mes, COUNT(*) as total 
    FROM estudiantes 
    GROUP BY mes
    ORDER BY mes
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// Profesores por mes (para gráfica de pastel o línea)
router.get('/profesores-por-mes', (req, res) => {
  db.all(`
    SELECT strftime('%Y-%m', fecha_registro) as mes, COUNT(*) as total
    FROM profesores
    GROUP BY mes
    ORDER BY mes
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Cursos nuevos por mes (para línea)
router.get('/cursos-por-mes', (req, res) => {
  db.all(`
    SELECT strftime('%Y-%m', fecha_creacion) as mes, COUNT(*) as total
    FROM cursos
    GROUP BY mes
    ORDER BY mes
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
})

router.get('/estudiantes', (req, res) => {
  db.all(`SELECT id, nombre || ' ' || apellido AS nombre, fecha_registro FROM estudiantes`, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener estudiantes:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(rows);
  });
});


// Crear estudiante
router.post('/estudiantes', (req, res) => {
  const { nombre, apellido, fecha_registro } = req.body;

  if (!nombre || !apellido || !fecha_registro) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  db.run(
    `INSERT INTO estudiantes (nombre, apellido, fecha_registro) VALUES (?, ?, ?)`,
    [nombre, apellido, fecha_registro],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensaje: 'Estudiante creado', id: this.lastID });
    }
  );
});

// Eliminar estudiante
router.delete('/estudiantes/:id', (req, res) => {
  const id = req.params.id;

  db.run(`DELETE FROM estudiantes WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Estudiante eliminado' });
  });
});

// Actualizar estudiante
router.put('/estudiantes/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, fecha_registro } = req.body;

  if (!nombre || !apellido || !fecha_registro) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  db.run(
    `UPDATE estudiantes SET nombre = ?, apellido = ?, fecha_registro = ? WHERE id = ?`,
    [nombre, apellido, fecha_registro, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Error al actualizar' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }

      res.json({ mensaje: 'Estudiante actualizado' });
    }
  );
});

// Obtener estudiantes con nombre y apellido separados
router.get('/estudiantes-detallado', (req, res) => {
  db.all(`SELECT id, nombre, apellido, fecha_registro FROM estudiantes`, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener estudiantes detallados:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(rows);
  });
});

module.exports = router;