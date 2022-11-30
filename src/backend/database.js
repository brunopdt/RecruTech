const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql-recrutech.cjtiqjvbcci9.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'recrutechtis2022',
  database: 'mysql_recrutech'
});

connection.connect((err) => {
    if(err) 
      return console.log(err);
    console.log('conectou!');
    createTable(connection);
  })