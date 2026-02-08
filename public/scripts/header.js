// Funcion Para activar barra lateral 

document.addEventListener('DOMContentLoaded', function () {
    // Obtén el div clickeable
    var detonador = document.getElementById('menuResponsive');
  
    // Agrega un evento de clic al div clickeable
    detonador.addEventListener('click', function () {
      // Obtén el div objetivo
      var barralateral = document.getElementById('sideNavBar');
  
      // Inyecta propiedades CSS sobre el div objetivo
      barralateral.style.left = '0px';
      
    });
  });

// Funcion para desactivar barra lateral 

document.addEventListener('DOMContentLoaded', function () {
    // Obtén el div clickeable
    var detonador = document.getElementById('closeNavBar');
  
    // Agrega un evento de clic al div clickeable
    detonador.addEventListener('click', function () {
      // Obtén el div objetivo
      var barralateral = document.getElementById('sideNavBar');
  
      // Inyecta propiedades CSS sobre el div objetivo
      barralateral.style.left = '100vw';
      
    });
  });

// Header transparente solo mientras esté sobre el hero

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero');
  if (!header || !hero) return;

  var wasTransparent = header.classList.contains('header-transparent');
  var updateHeaderStyle = function () {
    var heroBottom = hero.getBoundingClientRect().bottom;
    var threshold = Math.max(0, heroBottom - header.offsetHeight);
    if (threshold > 0) {
      header.classList.add('header-transparent');
    } else {
      header.classList.remove('header-transparent');
    }

    var isTransparent = header.classList.contains('header-transparent');
    if (isTransparent !== wasTransparent) {
      window.dispatchEvent(new CustomEvent('header:transparent', {
        detail: { isTransparent: isTransparent }
      }));
      wasTransparent = isTransparent;
    }
  };

  updateHeaderStyle();
  window.addEventListener('scroll', updateHeaderStyle, { passive: true });
  window.addEventListener('resize', updateHeaderStyle);
  });


  
// function esconderHeader () {

//   let ubicacionPrincipal = window.pageYOffset;
//   window.onscroll = function () {
//       let desplazamiento = window.pageYOffset; 
//       if (ubicacionPrincipal >= desplazamiento) {
//           document.getElementById('header').style.top = "0";
          
//       }
//       else {
//           document.getElementById('header').style.top = "-110px";
//       }

//       ubicacionPrincipal = desplazamiento;
// }
// } 
