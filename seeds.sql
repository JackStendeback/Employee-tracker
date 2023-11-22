INSERT INTO departments (id, name)
VALUES
    (001, "Sales"),
    (002, "IT"),
    (003, "Marketing"),
    (004, "Data Engineering"),
    (005, "Human Resources")
    (006, "Finance"),
    (007, "Customer Service"),
    (008, "Operations");

    SELECT * FROM departments;

INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (001, "Sales Representative", 60000, 1),
    (002, "Systems Administrator", 70000, 2),
    (003, "Social Media Manager", 50000, 3),
    (004, "Data Analyst", 65000, 4),
    (005, "Talent Aqcuisition Specialist", 50000, 5),
    (006, "Financial Analyst", 70000, 6),
    (007, "Customer Support Specialist", 40000, 7),
    (008, "Operations Manager", 90000, 8);

    SELECT * FROM roles;

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1001, "Emily", "Johnson", 001, 1102),
    (2001, "Michael", "Rodriguez", 002, 2203),
    (3001, "Sophia", "Chen", 003, 3302),
    (4001, "Alexander", "Nguyen", 004, 4402),
    (5001, "Olivia", "Smith", 005, 5502),
    (6001, "Daniel", "Kim", 006, 6602),
    (7001, "Ava", "Patel", 007, 7702),
    (8001, "Benjamin", "Garcia", 008, NULL)