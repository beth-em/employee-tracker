-- Clear out old data before inserting new data
TRUNCATE TABLE employee, role, department RESTART IDENTITY CASCADE;

-- Insert 'sample' departments 
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('HR'),
('Sales');

-- Insert 'sample' roles including: title, salary and department_id
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Junior Engineer', 75000, 1),
('Accountant', 150000, 2),
('HR Manager', 125000, 3),
('Sales Rep', 70000, 4);

-- Insert 'sample' employees including: first and last name, role and manager id
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Severus', 'Snape', 1, NULL), -- Severus is Software Engineer, she has no manager
('Luna', 'Lovegood', 2, NULL), -- Luna is an Accountant, she has no manager
('Ron', 'Weasley', 2, NULL), -- Ron is an HR Manager, he has no manager
('Harry', 'Potter', 5, NULL); -- Harry is a Sales Rep, he has no manager

-- Employees with managers
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Rubeus', 'Hagrid', 2, 1); -- Rubeus is a Junior Engineer, Severus is his manager