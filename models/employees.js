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
    return new Promise(async (resolve, reject) => {
        try {
            const roleResults = await queryDatabase('SELECT title FROM roles');
            const managerResults = await queryDatabase('SELECT CONCAT(first_name, " ", last_name) AS manager_name FROM employees');

            const roles = roleResults.map((role) => role.title);
            const managers = managerResults.map((manager) => manager.manager_name);

            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Enter the employee's first name:",
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Enter the employee's last name:",
                },
                {
                    type: 'list',
                    name: 'role_name',
                    message: "Select the employee's role:",
                    choices: roles,
                },
                {
                    type: 'list',
                    name: 'manager_name',
                    message: "Select the employee's manager (optional, press Enter if none):",
                    choices: [...managers, 'None'],
                },
            ]);

            const { first_name, last_name, role_name, manager_name } = answers;

            const role_id = await findRoleId(role_name);

            let manager_id = null;
            if (manager_name !== 'None') {
                const [managerFirstName, managerLastName] = manager_name.split(' ');
                manager_id = await findManagerId(managerFirstName, managerLastName);
            }

            let query, values;
            if (manager_id !== null) {
                query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                values = [first_name, last_name, role_id, manager_id];
            } else {
                query = 'INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)';
                values = [first_name, last_name, role_id];
            }

            await insertEmployee(query, values);

            console.log(`Added employee: ${answers.first_name} ${answers.last_name}`);
            await viewEmployees();
            resolve();
        } catch (error) {
            console.error('Error adding employee', error);
            reject(error);
        }
    });
}

function queryDatabase(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function findRoleId(role_name) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id FROM roles WHERE title = ?', [role_name], (err, roleResults) => {
            if (err) {
                reject(err);
            } else {
                const role_id = roleResults[0] ? roleResults[0].id : null;
                resolve(role_id);
            }
        });
    });
}

function findManagerId(firstName, lastName) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id FROM employees WHERE first_name = ? AND last_name = ?', [firstName, lastName], (err, managerResults) => {
            if (err) {
                reject(err);
            } else {
                const manager_id = managerResults[0] ? managerResults[0].id : null;
                resolve(manager_id);
            }
        });
    });
}

function insertEmployee(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function updateEmployee() {
    return new Promise((resolve, reject) =>  {

    })
}