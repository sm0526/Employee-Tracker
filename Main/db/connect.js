const mysql = require("mysql2");

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rizzoliharmony1",
    database: "employees"
});

connect.connect(function (err) {
    if (err) throw err;
});

module.exports = connect;