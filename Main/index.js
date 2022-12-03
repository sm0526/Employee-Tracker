const { prompt } = require("inquirer");
const db = require("./db");

start();

function start() {
    loadBasePromptList();
}

function loadBasePromptList() {
    prompt([
        {
            //need prompts for what to do to start: viewing employees(and how-by department or by management or just all). adding and removing employees. being able to edit employees(adding/removing roles). need to be able to see available employee roles and to edit those(add or remove). need to be able to see available departments and to edit those(add or remove).
        }
    ])//need to build how to take in the choices and will need a function for each 
}

//need functions
//view employees ->need 3 functions here one for each way to view the employees

//3 more functions: need a function to add an employee and another to remove one. Also need a funciton to edit the employee's role and one to edit the employee's manager. Employees will need an id, first name, last name, role id and manager id.

//3 more here: view employee roles, adding a role, and deleteing a role. Roles will need an id, name/title, salary, and department id.

//a final 3 here: view departments, add a department and deleting a department. Departments will need an id and a name.