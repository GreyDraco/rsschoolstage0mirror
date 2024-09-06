console.log("Script is connected!");

const overlay = document.querySelector(".overlay");
const burgerMenuBtn = document.querySelector(".burger-menu-btn");
const burgerMenu = document.querySelector(".burger-menu");

burgerMenuBtn.addEventListener("click", () => {
  burgerMenuBtn.classList.toggle("burger-menu-btn_active");
  overlay.classList.toggle("overlay_active");
  burgerMenu.classList.toggle("burger-menu_active");
});

overlay.addEventListener("click", () => {
  burgerMenuBtn.classList.remove("burger-menu-btn_active");
  overlay.classList.remove("overlay_active");
  burgerMenu.classList.remove("burger-menu_active");
});

function handleResize() {
  if (window.innerWidth > 767) {
    burgerMenuBtn.classList.remove("burger-menu-btn_active");
    overlay.classList.remove("overlay_active");
    burgerMenu.classList.remove("burger-menu_active");
  }
}

window.addEventListener("resize", handleResize);
