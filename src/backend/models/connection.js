const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'mysql-recrutech.cjtiqjvbcci9.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'recrutechtis2022',
    database: 'mysql_recrutech'
});

module.exports = connection;