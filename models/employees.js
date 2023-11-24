const inquirer = require('inquirer');
const connection = require('../server.js');
const { table } = require('table');

function viewEmployees() {
    return new Promise((resolve, reject) => {
        const query = `
    SELECT
        e.id AS 'EmployeeID',
        CONCAT(e.first_name, ' ', e.last_name) AS 'Employee Name',
        r.title AS 'Employee Role',
        CONCAT(m.first_name, ' ', m.last_name) AS 'Manager Name'
    FROM employees AS e
    LEFT JOIN roles AS r ON e.role_id = r.id
    LEFT JOIN employees AS m ON e.manager_id = m.id`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error, could not fetch employees within database.', err);
            return;
        }

        const employeeData = [['Employee ID', 'First Name', 'Last Name', 'Role', 'Manager']];
        results.forEach((employee) => {
            data.push([
                employee['Employee ID'],
                employee['First Name'],
                employee['Last Name'],
                employee['Role'],
                employee['Manager']
            ]);
        });
        const output = table(data);
        console.log('\nAll Employees:');
        console.log(output);
        resolve();
    });
  });
}

function addEmployee() {
    return new Promise((resolve, reject) => {

    })
}

function updateEmployee() {
    return new Promise((resolve, reject) =>  {

    })
}