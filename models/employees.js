const inquirer = require('inquirer');
const connection = require('../server.js');
const { table } = require('table');
const util = require('util');
const db = require('../server');

async function viewEmployees() {
    const query = `
        SELECT
            e.id AS 'Employee ID',
            CONCAT(e.first_name, ' ', e.last_name) AS 'Employee Name',
            r.title AS 'Employee Role',
            CONCAT(m.first_name, ' ', m.last_name) AS 'Manager Name'
        FROM employees AS e
        LEFT JOIN roles AS r ON e.role_id = r.id
        LEFT JOIN employees AS m ON e.manager_id = m.id`;

    const queryAsync = util.promisify(connection.query).bind(connection);

    try {
        const results = await queryAsync(query);

        const employeeData = [];
        results.forEach((employee) => {
            employeeData.push([
                employee['Employee ID'],
                employee['Employee Name'],
                employee['Employee Role'],
                employee['Manager Name']
            ]);
        });

        const Table = require('cli-table');
        const table = new Table({
            head: ['Employee ID', 'Employee Name', 'Employee Role', 'Manager Name']
        });

        employeeData.forEach((row) => {
            table.push(row);
        });

        console.log('\nAll Employees:');
        console.log(table.toString());
        return;
    } catch (err) {
        console.error('Error fetching employees from the database:', err);
        throw err;
    }
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


async function updateEmployeeRole() {
    const queryEmployees = util.promisify(connection.query).bind(connection);

    try {
        const employeeResults = await queryEmployees('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employees');

        const roleResults = await queryEmployees('SELECT id, title FROM roles');

        const employees = employeeResults.map((employee) => ({
            name: employee.employee_name,
            value: employee.id,
        }));

        const roles = roleResults.map((role) => ({
            name: role.title,
            value: role.id,
        }));

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: "Select the employee you want to update:",
                choices: employees,
            },
            {
                type: 'list',
                name: 'new_role_id',
                message: "Select the new role for the employee:",
                choices: roles,
            },
        ]);

        const { employee_id, new_role_id } = answers;

        const updateQuery = 'UPDATE employees SET role_id = ? WHERE id = ?';
        const updateValues = [new_role_id, employee_id];

        const updateEmployee = util.promisify(connection.query).bind(connection);
        const result = await updateEmployee(updateQuery, updateValues);

        if (result.affectedRows === 0) {
            console.log('No employee found with the provided ID.');
        } else {
            console.log(`Updated employee's role (Employee ID: ${employee_id}).`);
            await viewEmployees();
        }
    } catch (error) {
        console.error('Error updating employee role:', error);
        throw error;
    }
}

module.exports = { viewEmployees, addEmployee, updateEmployeeRole };