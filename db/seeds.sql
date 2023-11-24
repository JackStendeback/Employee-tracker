INSERT INTO department (id, name)
VALUES
    (1, 'Sales'),
    (2, 'IT'),
    (3, 'Marketing'),
    (4, 'Data Engineering'),
    (5, 'Human Resources'),
    (6, 'Finance'),
    (7, 'Customer Service'),
    (8, 'Operations');

SELECT * FROM department;

INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (1, 'Sales Representative', 60000, 1),
    (2, 'Systems Administrator', 70000, 2),
    (3, 'Social Media Manager', 50000, 3),
    (4, 'Data Analyst', 65000, 4),
    (5, 'Talent Acquisition Specialist', 50000, 5),
    (6, 'Financial Analyst', 70000, 6),
    (7, 'Customer Support Specialist', 40000, 7),
    (8, 'Operations Manager', 90000, 8);

SELECT * FROM roles;

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1001, 'Emily', 'Johnson', 1, 1102),
    (2001, 'Michael', 'Rodriguez', 2, 2203),
    (3001, 'Sophia', 'Chen', 3, 3302),
    (4001, 'Alexander', 'Nguyen', 4, 4402),
    (5001, 'Olivia', 'Smith', 5, 5502),
    (6001, 'Daniel', 'Kim', 6, 6602),
    (7001, 'Ava', 'Patel', 7, 7702),
    (8001, 'Benjamin', 'Garcia', 8, 8802);

SELECT * FROM employees;
