
let btn = document.querySelector('#actionButton');

btn.addEventListener('click', () => {
    logar();
})


function logar() {
    const inputEmail = document.querySelector('#login').value;
    const inputSenha = document.querySelector('#password').value;

    if (!inputEmail || !inputEmail) {
        return alert('Preencha todos os campos!');
    }

    axios.post('http://localhost:8081/usuarios-logar', {
        email: inputEmail, 
        senha: inputSenha
    }).then(response => {
        if (response.data.erro) {
            console.log("erro")
            return alert(response.data.erro);
        } else{
            window.location.href = '/cadastro-vagas';
        }
    }).catch(erro => {
        return alert(response.data.erro);
    });
}