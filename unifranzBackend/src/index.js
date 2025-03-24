const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la consulta');
    }
});
app.get('/usuarios',(req,res)=>{
    db.select('*').from('usuarios')
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('Error fetching movies'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});