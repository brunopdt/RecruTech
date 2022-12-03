const togglePassword = document.querySelector('#togglePassword')
const password = document.querySelector('#password')
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

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type =
      password.getAttribute('type') === 'password' ? 'text' : 'password'
  
    if (type == 'password') {
      togglePassword.className = 'fa-solid fa-eye fa-2xl icon'
    } else {
      togglePassword.className = 'fa-solid fa-eye-slash fa-2xl icon'
    }
  
    password.setAttribute('type', type)
  })
  