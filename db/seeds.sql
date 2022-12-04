USE employees;

INSERT INTO department
    (name)
VALUES 
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Senior Software Engineer', 200000, 1),
    ('Software Engineer', 170000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 71000, 2),
    ('Cheif Legal Officer', 360000, 3),
    ('Lawyer', 180000, 3),
    ('Sales Manager', 150000, 4),
    ('Sales Representative', 65000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Snow', 'White', 1, NULL),
    ('Red', 'Ridinghood', 2, 1),
    ('Rumple', 'Stiltskin', 3, NULL),
    ('Goldie', 'Locks', 4, 3),
    ('Briar', 'Rose', 5, NULL),
    ('Blue', 'Fairy', 6, 5),
    ('Mad', 'Hatter', 7, NULL),
    ('March', 'Hare', 8, 7);
