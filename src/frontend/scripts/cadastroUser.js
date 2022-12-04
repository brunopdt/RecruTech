const btn = document.querySelector('#botao-cadastrar');

btn.addEventListener('click', () => {
  const dadosUsuario = getDadosUsuarioForm();
  if (dadosUsuario == null || dadosUsuario == undefined)
    alert("Erro ao cadastrar o usuário! Todos os campos devem estar preenchidos.");
  else
    enviarDadosUsuarioParaApi(dadosUsuario)
})

function getDadosUsuarioForm() {
  const inputNome = document.querySelector('#nome');
  const inputSenha = document.querySelector('#password');
  const inputEmail = document.querySelector('#email');
  const inputTipoCadastro = document.querySelector("input[name='tipoUser']:checked");

  if (inputNome.value === "" || inputSenha.value === "" || inputEmail.value === "" ||
    inputTipoCadastro === null) {
    console.log("Erro, todos os campos devem estar preenchidos");
    return;
  }

  const usuario = {
    nome: inputNome.value,
    email: inputEmail.value,
    senha: inputSenha.value,
    tipoCadastro: inputTipoCadastro.value
  }

  return usuario;
}

async function enviarDadosUsuarioParaApi(usuario) {
  axios.post('http://localhost:8081/usuarios', {
    nome: usuario.nome,
    email: usuario.email,
    senha: usuario.senha,
    tipoCadastro: usuario.tipoCadastro
  }).then(response => {
    if (response.status === 201) {
      alert('Usuário cadastrado com sucesso')
      window.location.href = '/'
    }
  }).catch(erro => {
    return alert(erro);
  });
}