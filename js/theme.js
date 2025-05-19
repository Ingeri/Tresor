const themeOptions = document.querySelectorAll("#theme-options li");

function applyTheme(theme) {
  document.documentElement.classList.remove("theme-dark", "theme-light");

  if (theme === "dark") {
    document.documentElement.classList.add("theme-dark");
  } else if (theme === "light") {
    document.documentElement.classList.add("theme-light");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.classList.add(
      prefersDark ? "theme-dark" : "theme-light"
    );
  }

  localStorage.setItem("theme", theme);
  updateActiveClass(theme);
}

function updateActiveClass(selectedTheme) {
  themeOptions.forEach((li) => {
    li.classList.toggle("active", li.dataset.theme === selectedTheme);
  });
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "system";
  applyTheme(savedTheme);
}

themeOptions.forEach((li) => {
  li.addEventListener("click", () => {
    applyTheme(li.dataset.theme);
  });
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (localStorage.getItem("theme") === "system") {
      applyTheme("system");
    }
  });

document.addEventListener("DOMContentLoaded", loadTheme);
