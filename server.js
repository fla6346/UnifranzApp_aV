const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia por tu usuario de MySQL
  password: '', // Cambia por tu contraseña de MySQL
  database: 'bddgestion_eventos', // Cambia por el nombre de tu base de datos
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM usuario';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO usuario (usuario,contrasenia,habilitado,nombre,apellidoPat,apellidoMat,email) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [usuario,contrasenia,habilitado,nombre,apellidoPat,apellidoMat,email], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Usuario agregado correctamente' });
  });
});

// Iniciar el servidor
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});