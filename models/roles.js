const inquirer = require('inquirer');
const connection = require('../server.js');
const { table } = require('table');

async function fetchRoles() {
    try {
        const query = 'SELECT * FROM roles';
        const results = await connection.query(query);
        return results;
    } catch (error) {
        console.error('Error fetching roles', error);
        throw error;
    }
}

function displayRoles(roles) {
    const data = [['Role ID', 'Title', 'Salary', 'Department ID']];
    roles.forEach((role) => {
        data.push([role.id, role.title, role.salary, role.department_id]);
    });

    const output = table(data);
    console.log('\nAll Roles:');
    console.log(output);
}

async function addRole() {
    try {
        const departments = await fetchDepartments();

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
