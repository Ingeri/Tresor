const mobileMenu = document.querySelector(".mobile-menu");
const header = document.querySelector("header");

mobileMenu.addEventListener("click", () => {
  header.classList.toggle("active");
});
