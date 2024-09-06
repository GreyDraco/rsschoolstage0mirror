console.log("Script is connected!");

const overlay = document.querySelector(".overlay");
const burgerMenuBtn = document.querySelector(".burger-menu-btn");
const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuList = document.querySelector(".burger-menu-list");
const body = document.body;

burgerMenuBtn.addEventListener("click", () => {
  burgerMenuBtn.classList.toggle("burger-menu-btn_active");
  overlay.classList.toggle("overlay_active");
  burgerMenu.classList.toggle("burger-menu_active");
  body.classList.toggle("no-scroll");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

overlay.addEventListener("click", () => {
  burgerMenuBtn.classList.remove("burger-menu-btn_active");
  overlay.classList.remove("overlay_active");
  burgerMenu.classList.remove("burger-menu_active");
  body.classList.remove("no-scroll");
});

burgerMenuList.addEventListener("click", () => {
  burgerMenuBtn.classList.remove("burger-menu-btn_active");
  overlay.classList.remove("overlay_active");
  burgerMenu.classList.remove("burger-menu_active");
  body.classList.remove("no-scroll");
});

function handleResize() {
  if (window.innerWidth > 767) {
    burgerMenuBtn.classList.remove("burger-menu-btn_active");
    overlay.classList.remove("overlay_active");
    burgerMenu.classList.remove("burger-menu_active");
    body.classList.remove("no-scroll");
  }
}

window.addEventListener("resize", handleResize);
