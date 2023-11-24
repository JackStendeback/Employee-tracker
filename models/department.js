const inquirer = require('inquirer');
const connection = require('../server');
const { table } = require('table');
const db = require('../server');

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
        inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'What would you like to name the new department?',
            },
        ])
        .then((answers) => {
            const checkQuery = 'SELECT * FROM department WHERE name = ?';
            const valueCheck = [answers.department_name];

            connection.query(checkQuery, valueCheck, (err, results) => {
                if (err) {
                    console.error('Error, could not find existing department', err);
                    reject(err);
                    return;
                }
                if (results.length > 0) {
                    console.log(`\nThe department '${answers.name}' already exists.`);
                    resolve();
                    return;
                }
                const insertQuery = 'INSERT INTO department (name) VALUES (?)';
                const valueInsert = [answers.department_name];

                connection.query(insertQuery, valueInsert, (err, result) => {
                    if (err) {
                        console.error('Error, could not add department.', err);
                        reject(err);
                        return;
                    }

                    console.log(`\n${answers.name} this department has been successfully added.`);
                    viewDepartments().then(() => {
                        resolve();
                    });
                });
            });
        });
    });
}


// * ADD COMMENTS TO FURTHER UNDERSTAND WHAT WE ARE DOING HERE.
module.exports = { viewDepartments, addDepartments };