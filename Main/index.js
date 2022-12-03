const { prompt } = require("inquirer");
const { QueryInterface } = require("sequelize");
const db = require("./db");
require("console.table");

start();

function start() {
    loadBasePromptList();
}

function loadBasePromptList() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What do yo want to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View Employees by Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View Employees by Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Delete Employee",
                    value: "DELETE_EMPLOYEE"
                },
                {
                    name: "Change Employee Role",
                    value: "CHANGE_EMPLOYEE_ROLE"
                },
                {
                    name: "Change Employee Manager",
                    value: "CHANGE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Employee Roles",
                    value: "VIEW_ALL_EMPLOYEE_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Delete Role",
                    value: "DELETE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_ALL_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Delete Department",
                    value: "DELETE_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let selection = res.selection;
        switch (selection) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmployeesByDepartment();
                break;
            case "VIEW_EMPLOYEES_BY_MANAGER":
                viewEmployeesByManager();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "DELETE_EMPLOYEE":
                deleteEmployee();
                break;
            case "CHANGE_EMPLOYEE_ROLE":
                changeEmployeeRole();
                break;
            case "CHANGE_EMPLOYEE_MANAGER":
                changeEmployeeManager();
                break;
            case "VIEW_ALL_EMPLOYEE_ROLES":
                viewAllEmployeeRoles();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "DELETE_ROLE":
                deleteRole();
                break;
            case "VIEW_ALL_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "DELETE_DEPARTMENT":
                deleteDepartment();
                break;
            case "QUIT":
                quit();
        }
    })
}

//need functions
//view employees ->need 3 functions here one for each way to view the employees
function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .then(() => loadBasePromptList());
}

function viewEmployeesByDepartment() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        prompt([
            {
                type: "list",
                name: "departmentId",
                message: "For what department would you like to see the list of employees?",
                choices: departmentChoices
            }
        ])
            .then(res => db.findAllEmployeesByDepartment(res.departmentId))
            .then(([rows]) => {
                let employees = rows;
                console.log("\n");
                console.table(employees);
            })
            .then(() => loadBasePromptList())
    });      
}


//3 more functions: need a function to add an employee and another to remove one. Also need a funciton to edit the employee's role and one to edit the employee's manager. Employees will need an id, first name, last name, role id and manager id.


//3 more here: view employee roles, adding a role, and deleteing a role. Roles will need an id, name/title, salary, and department id.

//a final 3 here: view departments, add a department and deleting a department. Departments will need an id and a name.