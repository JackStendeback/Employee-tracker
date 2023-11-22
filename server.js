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
    console.log('Connected to the employee_db database.')
);

// Querying the database/tables.
db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
});

db.query('SELECT * FROM roles', function (err, results) {
    console.log(results);
})

db.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
})

// Default responses
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});g