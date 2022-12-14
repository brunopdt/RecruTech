let rotaIcone1, rotaIcone2, rotaIcone3;
if(document.cookie.split(';')[2].split('=')[1] == 'rh'){
  rotaIcone1 = "/cadastro-vagas";
  rotaIcone2 = "/lista-vagas-empresa";
  rotaIcone3 = "indicadores";
}
else {
  rotaIcone1 = "/vagas-inscritas";
  rotaIcone2 = "/lista-vagas";
  rotaIcone3 = "/indicadores";
}

function myFunction(x) {

  if (x.matches) {
    document.querySelector('.sidebar').innerHTML = `
    <img id="logo_sidebar" src="../imgs/logo_icon.jpg" alt="logo_icon" />
    <a href=${rotaIcone1}><i class="fa-solid fa-user-plus fa-xl"></i></a>
    <a href=${rotaIcone2}><i class="nav-item fa-solid fa-list fa-xl"></i></a>
    <a href=${rotaIcone3}><i class="fa-solid fa-chart-simple fa-xl"></i></a>
    <a href="#"
      ><i class="nav-item fa-solid fa-right-from-bracket fa-xl"></i
    ></a> 
  `
  } else {
    document.querySelector('.sidebar').innerHTML = ` <div id="sidebar-separate">
    <img id="logo_sidebar" src="../imgs/logo_icon.jpg" alt="logo_icon" />
    <a href=${rotaIcone1}><i class="fa-solid fa-user-plus fa-xl"></i></a>
    <a href=${rotaIcone2}><i class="nav-item fa-solid fa-list fa-xl"></i></a>
    <a href=${rotaIcone3}><i class="fa-solid fa-chart-simple fa-xl"></i></a>
  </div>

  <a href="#"
    ><i class="nav-item fa-solid fa-right-from-bracket fa-xl"></i
  ></a>`
  }
}

var x = window.matchMedia('(max-width: 1024px)')
myFunction(x)
x.addListener(myFunction)
