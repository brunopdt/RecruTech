function myFunction(x) {
  if (x.matches) {
    document.querySelector('.sidebar').innerHTML = `
    <img id="logo_sidebar" src="../imgs/logo_icon.jpg" alt="logo_icon" />
    <a href="#"><i class="nav-item fa-solid fa-user fa-xl"></i></a>
    <a href="#"><i class="nav-item fa-solid fa-square-plus fa-xl"></i></a>
    <a href="#"><i class="nav-item fa-solid fa-list fa-xl"></i></a>
    <a href="#"><i class="fa-solid fa-chart-simple fa-xl"></i></a>
    <a href="#"
      ><i class="nav-item fa-solid fa-right-from-bracket fa-xl"></i
    ></a> 
  `
  } else {
    document.querySelector('.sidebar').innerHTML = ` <div id="sidebar-separate">
    <img id="logo_sidebar" src="../imgs/logo_icon.jpg" alt="logo_icon" />
    <a href="#"><i class="nav-item fa-solid fa-user fa-xl"></i></a>
    <a href="#"><i class="nav-item fa-solid fa-square-plus fa-xl"></i></a>
    <a href="#"><i class="nav-item fa-solid fa-list fa-xl"></i></a>
    <a href="#"><i class="fa-solid fa-chart-simple fa-xl"></i></a>
  </div>

  <a href="#"
    ><i class="nav-item fa-solid fa-right-from-bracket fa-xl"></i
  ></a>`
  }
}

var x = window.matchMedia('(max-width: 1024px)')
myFunction(x)
x.addListener(myFunction)
