// Import the database connection pool from db.js
const pool = require('./db');
// Import console.table to display query results in table format
const cTable = require('console.table');

// View all departments from db
async function viewDepartments() {
    const res = await pool.query('SELECT * FROM department');
    console.table(res.rows);
}

// View all roles from db 
async function viewRoles() {
    const res = await pool.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department_id
    `);
    console.table(res.rows);
}

// View all employees from db
async function viewEmployees() {
    const res = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
        COALESCE(m.first_name || ' ' || m.last_name, 'None') AS manager 
        FROM employee e 
        JOIN role ON e.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        LEFT JOIN employee m ON e.manager_id = m.id
    `);
    console.table(res.rows);
}

// Add a new department
async function addDepartment(departmentName) {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
    console.log(`Added department: ${departmentName}`);
}

// Add a new role
async function addRole(title, salary, departmentId) {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    console.log(`Added role: ${title}`);
}

// Add a new employee
async function addEmployee(firstName, lastName, roleId, managerId) {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
    [firstName, lastName, roleId, managerId || null]);
    console.log(`Added employee: ${firstName} ${lastName}`);
}

// Update an employee’s role
async function updateEmployeeRole(employeeId, newRoleId) {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    console.log(`Updated employee ID ${employeeId} to role ID ${newRoleId}`);
}

module.exports = { 
    viewDepartments, 
    viewRoles, 
    viewEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole 
};