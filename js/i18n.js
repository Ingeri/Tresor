// Javascript file for handling internationalization (i18n) in a web application
// This script loads translations based on the user's selected language and updates the UI accordingly.
async function loadLang(lang) {
  try {
    const res = await fetch(`./locales/${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("language", lang);
    highlightActiveLang(lang);
  } catch (e) {
    console.warn(`Missing translations for language: ${lang}`);
  }
}

// Highlight the active language
function highlightActiveLang(lang) {
  document.querySelectorAll("#lang-list li").forEach((li) => {
    li.classList.toggle("active", li.getAttribute("data-lang") === lang);
  });
}

// Handle language selection
document.querySelectorAll("#lang-list li").forEach((item) => {
  item.addEventListener("click", () => {
    const lang = item.getAttribute("data-lang");
    loadLang(lang);
  });
});

// Load saved or default language on first load
const userLang = localStorage.getItem("language") || "en";
loadLang(userLang);
