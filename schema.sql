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