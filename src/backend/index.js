const express = require('express');
const app = express();
const port = 8081;
const mysql = require('mysql2');

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: 'Funcionando!' });
})

app.get('/status-vaga', (req, res) => {
    execSQLQuery('SELECT * FROM status_vaga', res);
})

app.listen(port, function () {
    console.log("Servidor rodando na porta 8081 (http://localhost:8081)")
})

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'mysql-recrutech.cjtiqjvbcci9.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'recrutechtis2022',
        database: 'mysql_recrutech'
    });

    connection.query(sqlQry, (error, results, fields) => {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}