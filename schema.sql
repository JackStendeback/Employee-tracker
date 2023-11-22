-- Make sure another db with the same name does not exist.
DROP DATABASE IF EXISTS employee_db;
-- Creating the database after checking to see if it already exists.
CREATE DATABASE employee_db;
-- Using the database after its creation.
USE employee_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
)