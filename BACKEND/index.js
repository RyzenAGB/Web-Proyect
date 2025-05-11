const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Importamos conexión a SQLite
const dashboardRoutes = require('./routes/dashboard.routes');


const app = express();
const PORT = 3000;
const SECRET_KEY = 'clave-secreta-supersegura'; // Puedes mover esto a un .env o archivo config



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de Escuela funcionando 🎓');
});

// ===================
// Registro de usuario
// ===================
app.post('/api/register', async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  if (!['alumno', 'profesor'].includes(rol)) {
    return res.status(400).json({ mensaje: 'Rol inválido' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)`,
    [nombre, correo, hashedPassword, rol],
    function(err) {
      if (err) {
        return res.status(400).json({ error: 'Correo ya registrado' });
      }
      res.status(201).json({ mensaje: 'Usuario registrado', id: this.lastID });
    });
});

// ===================
// Login de usuario
// ===================
app.post('/api/login', (req, res) => {
  const { correo, password } = req.body;

  db.get(`SELECT * FROM usuarios WHERE correo = ?`, [correo], async (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error interno' });
    if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  });
});

// ========================
// Middleware para verificar token
// ========================
function verificarToken(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Token no proporcionado' });

  const token = header.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.usuario = decoded;
    next();
  });
}

// ========================
// Ruta protegida con token
// ========================
app.get('/api/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Acceso permitido',
    datos: req.usuario
  });
});


app.use('/', dashboardRoutes);

// ========================
// Iniciar servidor
// ========================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
