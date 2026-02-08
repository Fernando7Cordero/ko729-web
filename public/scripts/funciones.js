
document.addEventListener("DOMContentLoaded", function () {
  var banners = document.querySelectorAll(".banner_element");

  if (!banners.length) {
    return;
  }

  var index = 0;

  function mostrarBanner(actual, siguiente) {
    if (banners[actual]) {
      banners[actual].style.opacity = "0";
    }

    if (banners[siguiente]) {
      banners[siguiente].style.opacity = "1";
    }
  }

  // Si solo hay un banner, asegúrate de que esté visible.
  if (banners.length === 1) {
    banners[0].style.opacity = "1";
    return;
  }

  // Inicializa todos visibles menos el primero.
  banners.forEach(function (banner, idx) {
    banner.style.opacity = idx === 0 ? "1" : "0";
  });

  setInterval(function () {
    var nextIndex = (index + 1) % banners.length;
    mostrarBanner(index, nextIndex);
    index = nextIndex;
  }, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
  var hero = document.getElementById("hero");
  var content = document.getElementById("contentStart");
  if (!hero || !content) {
    return;
  }

  var lastScrollY = window.scrollY;
  var isAutoScrolling = false;
  var cooldownUntil = 0;

  var smoothScrollTo = function (targetY, duration) {
    isAutoScrolling = true;
    cooldownUntil = Date.now() + duration + 200;
    var startY = window.scrollY;
    var distance = targetY - startY;
    var startTime = null;

    var easeInOutCubic = function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    var step = function (timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        isAutoScrolling = false;
      }
    };

    window.requestAnimationFrame(step);
  };

  var onScroll = function () {
    if (isAutoScrolling || Date.now() < cooldownUntil) {
      return;
    }

    var currentScrollY = window.scrollY;
  var heroHeight = hero.offsetHeight || window.innerHeight;
  var downThreshold = heroHeight * 0.15;
  var upThreshold = heroHeight * 0.2;
  var downReturnThreshold = heroHeight * 0.65;
    var isScrollingDown = currentScrollY > lastScrollY;
  var isScrollingUp = currentScrollY < lastScrollY;
  var heroBottom = hero.getBoundingClientRect().bottom;

    var withinFirstHalf = currentScrollY <= window.innerHeight * 0.5;

    if (isScrollingDown && withinFirstHalf && currentScrollY > downThreshold && heroBottom <= window.innerHeight * 0.95) {
      smoothScrollTo(content.offsetTop, 1600);
    }

    if (isScrollingDown && withinFirstHalf && currentScrollY > downReturnThreshold && heroBottom <= window.innerHeight * 0.7) {
      smoothScrollTo(content.offsetTop, 1600);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
});
