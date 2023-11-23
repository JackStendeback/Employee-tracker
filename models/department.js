const inquirer = require('inquirer');
const connection = require('../server');
const { table } = require('table');

function viewDepartments() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM department';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Could not fetch department data.');
                reject(err);
                return;
            }
            const data = [['Department ID', 'Department Name']];
            results.forEach((department) => {
                data.push([department.id, department.name]);
            });
            const output = table(data);
            console.log('\nAll Departments');
            console.log(output);
            resolve();
        })
    });
}

function addDepartments() {
    return new Promise((resolve, reject) => {

    });
}