const app = require('./backend/app');
const port = 8081;
console.log("Entrou aqui")
app.listen(port, function () {
    console.log("Servidor rodando na porta 8081 (http://localhost:8081)")
})
