// Theme management script for a web application
// This script allows users to switch between light, dark, and system themes.

const themeOptions = document.querySelectorAll("#theme-options li");

function applyTheme(theme) {
  // Remove previously applied theme classes
  document.documentElement.classList.remove("theme-dark", "theme-light");

  // Apply selected theme or system preference
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

  // Store theme preference
  localStorage.setItem("theme", theme);

  // Mark active theme in the UI
  updateActiveClass(theme);

  // Optional: Add data-theme attribute for styling
  document.documentElement.setAttribute("data-theme", theme);
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

// Handle theme option clicks
themeOptions.forEach((li) => {
  li.addEventListener("click", () => {
    const theme = li.dataset.theme;
    applyTheme(theme);
  });
});

// React to system theme changes if "system" is selected
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (localStorage.getItem("theme") === "system") {
      applyTheme("system");
    }
  });

// Load theme on page ready
document.addEventListener("DOMContentLoaded", loadTheme);
