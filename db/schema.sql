DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);
