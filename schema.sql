-- Make sure another db with the same name does not exist.
DROP DATABASE IF EXISTS employee_db;
-- Creating the database after checking to see if it already exists.
CREATE DATABASE employee_db;
-- Using the database after its creation.
USE employee_db;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
)G