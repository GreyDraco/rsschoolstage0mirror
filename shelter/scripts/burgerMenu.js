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

function hideBurgerOverlay() {
  burgerMenuBtn.classList.remove("burger-menu-btn_active");
  overlay.classList.remove("overlay_active");
  burgerMenu.classList.remove("burger-menu_active");
  body.classList.remove("no-scroll");
  overlay.innerHTML = "";
  //  setCaruselWidth();
}

overlay.addEventListener("click", (event) => {
  if (!event.target.closest(".popup-container")) hideBurgerOverlay();
});

burgerMenuList.addEventListener("click", () => {
  hideBurgerOverlay();
});

function handleResize() {
  if (window.innerWidth > 767) {
    hideBurgerOverlay();
  }
}

window.addEventListener("resize", handleResize);
