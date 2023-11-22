// Imports and requiring mysql
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
const app = express();

// Express Middleware required
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connecting to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'JackStendeback',
        database: 'employee_db'
    },
    
)