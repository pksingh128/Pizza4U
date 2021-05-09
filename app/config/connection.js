const mysql = require('mysql');

const db = mysql.createConnection({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_pass,
    database        : process.env.DB_NAME ,
    multipleStatements: true
});

module.exports = db;