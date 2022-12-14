//limpa os cookies toda vez que recarregar a página
document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

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

    axios.post('https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/usuarios-logar', {
        email: inputEmail, 
        senha: inputSenha
    }).then(response => {
        if (response.status === 400) {
            return alert("Login inválido!");
        } else if(document.cookie.split(';')[2].split('=')[1] == 'rh'){
            window.location.href = '/cadastro-vagas';
        } else {
            window.location.href = '/lista-vagas';
        }
    }).catch(erro => {
        return alert(erro);
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
  