const togglePassword = document.querySelector('#togglePassword')
const password = document.querySelector('#password')
const button = document.querySelector('#actionButton');

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
  const login = document.getElementById('login').value;
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
