require('dotenv').config();  // Import all required packages 
const inquirer = require('inquirer');  // Import Inquirer package for user prompts
const pool = require('./src/db.js');  // Import the db connection pool

// Import functions to view and add departments, roles, employees and to update employees as well.
const { 
    viewDepartments, 
    viewRoles, 
    viewEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole 
} = require('./src/queries');

// When node index.js is entered, this message will appear letting the user know app is running
console.log('Employee Tracker app is running!!!');

// Function to display the main menu and allow user to select one of the choices below
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ]).then(answer => {
        switch (answer.choice) {
            case 'View All Departments':
                viewDepartments().then(() => mainMenu());
                break;
            case 'View All Roles':
                viewRoles().then(() => mainMenu());
                break;
            case 'View All Employees':
                viewEmployees().then(() => mainMenu());
                break;
            case 'Add Department':
                promptAddDepartment();
                break;
            case 'Add Role':
                promptAddRole();
                break;
            case 'Add Employee':
                promptAddEmployee();
                break;
            case 'Update Employee Role':
                promptUpdateEmployeeRole();
                break;
            case 'Exit':
                console.log("Goodbye!");
                process.exit();
        }
    });
}

// Prompt for user to add a new department
function promptAddDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the new department:'
        }
    ]).then(answer => {
        addDepartment(answer.departmentName).then(() => mainMenu());
    });
}

// Prompt for user to add a new role
function promptAddRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
            validate: value => !isNaN(value) ? true : 'Please enter a valid number'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID for this role:'
        }
    ]).then(answer => {
        addRole(answer.title, answer.salary, answer.departmentId).then(() => mainMenu());
    });
}

// Prompt for user to add a new employee
function promptAddEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID for this employee:'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID for this employee (or leave blank for none):',
            default: null
        }
    ]).then(answer => {
        addEmployee(answer.firstName, answer.lastName, answer.roleId, answer.managerId).then(() => mainMenu());
    });
}

// Prompt for user to update an employee's role
function promptUpdateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee you want to update:'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID for this employee:'
        }
    ]).then(answer => {
        updateEmployeeRole(answer.employeeId, answer.newRoleId).then(() => mainMenu());
    });
}

// Start the application
mainMenu();
