// backend/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Teste de rota
app.get('/', (req, res) => {
  res.send('API Dose Certa está no ar!');
});

// Listar usuários
app.get('/usuarios', async (req, res) => {
  const result = await pool.query('SELECT id, nome, email FROM users ORDER BY id DESC');
  res.json(result.rows);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
