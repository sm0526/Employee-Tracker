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

function viewEmployeesByManager() {
    db.findAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            prompt([
                {
                    type: "list",
                    name: "managerId",
                    message: "Select a manager to see their employee list",
                    choices: managerChoices
                }
            ])
                .then(res => db.findAllEmployeesByManager(res.managerId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    if (employees.length === 0) {
                        console.log("This employee does not manage anyone");
                    } else {
                        console.table(employees);
                    }
                })
                .then(() => loadBasePromptList())
        });
}
//4 more functions: need a function to add an employee and another to remove one. Also need a funciton to edit the employee's role and one to edit the employee's manager. Employees will need an id, first name, last name, role id and manager id.
function addEmployee() {
    prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;
            db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "What is the employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;
                            db.findAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));
                                    managerChoices.unshift({ name: "None", value: null });
                                    prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Who is the employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }
                                            db.createEmployee(employee);
                                        })
                                        .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
                                        .then(() => loadBasePromptList())
                                })
                        })
                })
        })
}

function deleteEmployee() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee do you want to delete?",
                    choices: employeeChoices
                }
            ])
                .then(res => db.deleteEmployee(res.employeeId))
                .then(() => console.log("Deleted employee from the database"))
                .then(() => loadBasePromptList())
        })
}

function changeEmployeeRole() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign the selected employee?",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.changeEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("Updated employee's role"))
                                .then(() => loadBasePromptList())
                        });
                });
        })
}

function changeEmployeeManager() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's manager do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId
                    db.findAllPossibleManagers(employeeId)
                        .then(([rows]) => {
                            let managers = rows;
                            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "managerId",
                                    message:
                                        "Which employee do you want to set as manager for the selected employee?",
                                    choices: managerChoices
                                }
                            ])
                                .then(res => db.changeEmployeeManager(employeeId, res.managerId))
                                .then(() => console.log("Updated employee's manager"))
                                .then(() => loadBasePromptList())
                        })
                })
        })
}
//3 more here: view employee roles, adding a role, and deleteing a role. Roles will need an id, name/title, salary, and department id.
function viewAllEmployeeRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => loadBasePromptList());
}

function addRole() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.createRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => loadBasePromptList())
                })
        })
}

function deleteRole() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "roleId",
                    message:
                        "Which role do you want to remove? (Warning: This will also remove employees)",
                    choices: roleChoices
                }
            ])
                .then(res => db.deleteRole(res.roleId))
                .then(() => console.log("Removed role from the database"))
                .then(() => loadBasePromptList())
        })
}
//a final 3 here: view departments, add a department and deleting a department. Departments will need an id and a name.
function viewAllDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => loadBasePromptList());
}

function addDepartment() {
    prompt([
        {
            name: "name",
            message: "What is the name of the department you will be adding?"
        }
    ])
        .then(res => {
            let name = res;
            db.createDepartment(name)
                .then(() => console.log(`Added ${name.name} to the database`))
                .then(() => loadBasePromptList())
        })
}

