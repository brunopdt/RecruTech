const btn = document.querySelector('#botao-cadastrar')

btn.addEventListener('click', () => {
  const dadosUsuario = getDadosUsuarioForm()
  if (dadosUsuario == null || dadosUsuario == undefined)
    alert(
      'Erro ao cadastrar o usuário! Todos os campos devem estar preenchidos.'
    )
  else enviarDadosUsuarioParaApi(dadosUsuario)
})

function getDadosUsuarioForm() {
  const inputNome = document.querySelector('#nome')
  const inputSenha = document.querySelector('#password')
  const inputEmail = document.querySelector('#email')
  const inputTipoCadastro = document.querySelector(
    "input[name='tipoUser']:checked"
  )

  if (
    inputNome.value === '' ||
    inputSenha.value === '' ||
    inputEmail.value === '' ||
    inputTipoCadastro === null
  ) {
    console.log('Erro, todos os campos devem estar preenchidos')
    return
  }

  const usuario = {
    nome: inputNome.value,
    email: inputEmail.value,
    senha: inputSenha.value,
    tipoCadastro: inputTipoCadastro.value
  }

  return usuario
}

async function enviarDadosUsuarioParaApi(usuario) {
  axios
    .post('https://plf-es-2022-2-ti2-0924100-recrutech-tis2.vercel.app/usuarios', {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      tipoCadastro: usuario.tipoCadastro
    })
    .then(response => {
      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso')
        window.location.href = '/'
      }
    })
    .catch(erro => {
      return alert(erro)
    })
}

const togglePassword = document.querySelector('#togglePassword')

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
