console.log("Script is connected!");

const overlay = document.querySelector(".overlay");
const burger_menu = document.querySelector(".burger-menu");
burger_menu.addEventListener("click", () => {
  burger_menu.classList.toggle("burger-menu_active");
  overlay.classList.toggle("overlay_active");
});
