const express = require('express');
const mysql = require('mysql2');
const app = express();

const PORT = process.env.PORT || 3002;

const db = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: 'JackStendeback',
    database: 'employee_db'
});

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
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

module.exports = db;
