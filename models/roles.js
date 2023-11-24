const inquirer = require('inquirer');
const connection = require('../server.js');
const { table } = require('table');
const { viewDepartments } = require('./department');
const db = require('../server');

async function fetchRoles() {
    try {
        const query = 'SELECT * FROM roles';
        const results = await connection.query(query);
        
        console.log('Retrieved roles:', results);

        return results;
    } catch (error) {
        console.error('Error fetching roles', error);
        throw error;
    }
}

async function displayRoles(roles) {
    try {
        if (!roles || roles.length === 0) {
            console.log('No roles found.');
            return;
        }

        console.log('Roles data:', roles);

        const data = roles.map((role) => [
            role.id,
            role.title,
            role.salary,
            role.department_id
        ]);

        const tableConfig = {
            columns: {
                0: { alignment: 'left' },
                1: { alignment: 'left' },
                2: { alignment: 'left' },
                3: { alignment: 'left' }
            }
        };

        console.log('\nAll Roles:');
        console.log(table(data, tableConfig));
    } catch (err) {
        console.error('Error displaying roles:', err);
        throw err;
    }
}


async function addRole() {
    try {
        const departments = await viewDepartments();

        const departmentChoices = departments.map((department) => ({
            name: department.department_name,
            value: department.id,
        }));

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: "Enter the role's title:",
            },
            {
                type: 'number',
                name: 'salary',
                message: "Enter the role's salary:",
            },
            {
                type: 'list',
                name: 'department_id',
                message: "Select the department for this role:",
                choices: departmentChoices,
            },
        ]);

        const { title, salary, department_id } = answers;

        const insertQuery = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        const insertValues = [title, salary, department_id];

        await connection.query(insertQuery, insertValues);

        console.log(`Added new role: ${title}`);
        return;
    } catch (error) {
        console.error('Error adding role', error);
        throw error;
    }
}

module.exports = { fetchRoles, displayRoles, addRole };
