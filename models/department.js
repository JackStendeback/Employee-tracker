const inquirer = require('inquirer');
const connection = require('../server');
const { table } = require('table');
const db = require('../server');

function viewDepartments() {
    const query = 'SELECT * FROM department';
    return connection.query(query)
        .then(([rows]) => {
            const data = [['Department ID', 'Department Name']];
            rows.forEach((row) => {
                data.push([row.id, row.name]);
            });
            const output = table(data);
            console.log('\nAll Departments:');
            console.log(output);
        })
        .catch((err) => {
            console.error('Could not fetch department data.', err);
            throw err;
        });
}

function addDepartments() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What would you like to name the new department?',
        },
    ])
    .then((answers) => {
        const checkQuery = 'SELECT * FROM department WHERE name = ?';
        const valueCheck = [answers.department_name];

        return connection.query(checkQuery, valueCheck)
            .then((results) => {
                if (results.length > 0) {
                    console.log(`\nThe department '${answers.department_name}' already exists.`);
                    return; 
                }

                const insertQuery = 'INSERT INTO department (name) VALUES (?)';
                const valueInsert = [answers.department_name];

                return connection.query(insertQuery, valueInsert)
                    .then(() => {
                        console.log(`\n${answers.department_name} this department has been successfully added.`);
                        return viewDepartments();
                    });
            });
    })
    .catch((err) => {
        console.error('Error encountered in addDepartments:', err);
        throw err;
    });
}

module.exports = { viewDepartments, addDepartments };
