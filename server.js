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

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = db;
