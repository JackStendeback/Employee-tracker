const express = require('express');
const mysql = require('mysql2/promise'); 
const app = express();

const PORT = process.env.PORT || 3002;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'JackStendeback',
    database: 'employee_db'
});

app.get('/employees', async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM employees');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/employees', (req, res) => {
    res.status(501).send('Not implemented');
});

app.use((req, res) => {
    res.status(404).send('Not found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = pool;

