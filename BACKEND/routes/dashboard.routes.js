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



module.exports = router;