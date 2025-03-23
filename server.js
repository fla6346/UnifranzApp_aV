/*const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: '*', // Permitir solo este origen
  methods: 'GET,POST', // Métodos permitidos
  allowedHeaders: 'Content-Type,Authorization' // Encabezados permitidos
};

app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia por tu usuario de MySQL
  password: '', // Cambia por tu contraseña de MySQL
  database: 'bddgestion_eventosuft', // Cambia por el nombre de tu base de datos
});

db.connect((err) => {
  if (err) {
    console.log('Error conectando a la base de datos MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM usuario';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
});

// Ruta para agregar un nuevo usuario
app.post('/api/users', (req, res) => {
  const { usuario, contrasenia, habilitado, nombre, apellidoPat, apellidoMat, email } = req.body;
  const sql = 'INSERT INTO usuario (usuario, contrasenia, habilitado, nombre, apellidoPat, apellidoMat, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [usuario, contrasenia, habilitado, nombre, apellidoPat, apellidoMat, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err }); // Enviar un mensaje de error si hay un problema
    }
    res.json({ message: 'Usuario agregado correctamente' });
  });
});

// Iniciar el servidor
const PORT = 5000; // Asegúrate de que este puerto esté disponible
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
});*/