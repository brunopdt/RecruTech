const togglePassword = document.querySelector('#togglePassword')
const password = document.querySelector('#password')
const button = document.querySelector('#actionButton');
const uri = "http://localhost:8081/usuarios"
let textoHTML = '';


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

button.addEventListener('click', function (e) {
  const pass = document.getElementById('password').value;
  const login = document.getElementById('nome').value;
  console.log(`Login: ${login} \nPassword: ${pass} `);
  swal.fire({
    "title": "Bem-vindo",
    "text":"logado com sucesso",
    "icon": "success",
    "timer": 3000,
    "showConfirmButton":false,
    "toast": true,
   // "position":"top-right",
   // "progressBar"
  })
  const actbutton = document.getElementById('actionButton');

  actbutton.disabled = true;
})


async function getItems() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const data = await fetch(uri, {
    method: "GET",
    headers: headers,
  }).then((response) => { return response.json() });
  return data;

}

const data = getItems();

const LOGIN_URL = "/src/frontend/views/login.html";

const CHANGE_URL_CANDIDATO = "src/frontend/views/listaDeVagasUsuario.html"
const CHANGE_URL_RH = "src/frontend/views/listaDeVagasRH.html"



// Objeto para o banco de dados de usuários baseado em JSON
let db_usuarios = {};

// Objeto para o usuário corrente
let usuarioCorrente = {};

// função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
const generateUUID = () => { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function processaFormLogin (event) {                
  // Cancela a submissão do formulário para tratar sem fazer refresh da tela
  event.preventDefault ();

  // Obtem os dados de login e senha a partir do formulário de login
  const username = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  // Valida login e se estiver ok, redireciona para tela inicial da aplicação
  resultadoLogin = loginUser (username, password);
  if (resultadoLogin) {
      window.location.href = '';
  }
  else { // Se login falhou, avisa ao usuário
      alert ('Usuário ou senha incorretos');
  }
}

// Inicializa o usuarioCorrente e banco e dados de usuários da aplicação de Login
const initLoginApp = () =>{
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    const usuariosJSON = data;

    db_usuarios = JSON.parse(usuariosJSON);    

};


// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
const loginUser = (login, senha) => {
    
    // Verifica todos os itens do banco de dados de usuarios 
    data.forEach( user => {
       if(user.login == login && user.senha == senha){
        usuarioCorrente.id = usuario.id;
        usuarioCorrente.login = usuario.login;
        usuarioCorrente.email = usuario.email;
        usuarioCorrente.nome = usuario.nome;
        
        // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
        sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

        // Retorna true para usuário encontrado
        return true;
       }
    });

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

// Apaga os dados do usuário corrente no sessionStorage
const logoutUser = () => {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = LOGIN_URL;
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();
