const inquirer = require('inquirer');
const {
    viewDepartments,
    addDepartment,
} = require('./models/department');
const {
    viewRoles,
    addRole,
} = require('./models/role');
const {
    viewEmployees,
    addEmployee,
    updateEmployeeRole,
} = require('./models/employee');

async function mainMenu() {
    while (true) {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Which action would you like to perform?',
                    choices: [
                        'View all departments',
                        'View all roles',
                        'View all employees',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee role',
                        'Exit',
                    ],
                },
            ]);

            switch (answers.action) {
                case 'View all departments':
                    await viewDepartments();
                    break;
                case 'View all roles':
                    await viewRoles();
                    break;
                case 'View all employees':
                    await viewEmployees();
                    break;
                case 'Add a department':
                    await addDepartment();
                    break;
                case 'Add a role':
                    await addRole();
                    break;
                case 'Add an employee':
                    await addEmployee();
                    break;
                case 'Update an employee role':
                    await updateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Goodbye and thanks for using Employee Tracker! Have a nice day!');
                    return;
            }
        } catch (error) {
            console.error('An error occurred:', error);
            return;
        }
    }
}

// ? gStart the application by invoking the main menu
mainMenu();
