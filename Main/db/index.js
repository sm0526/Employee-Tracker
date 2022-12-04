const connection = require("./connect");

class DB {
    //reference to the connection just in case
    constructor(connection) {
        this.connection = connection;
    }
    //need to create functions that go with the db ones created on the functions in index.js
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
}

module.exports = new DB(connection);