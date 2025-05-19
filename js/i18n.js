// Load and apply translations
async function loadLang(lang) {
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
}

// Handle list item click
document.querySelectorAll("#lang-list li").forEach((item) => {
  item.addEventListener("click", () => {
    const lang = item.getAttribute("data-lang");
    loadLang(lang);
  });
});

// Highlight the active language
function highlightActiveLang(lang) {
  document.querySelectorAll("#lang-list li").forEach((li) => {
    li.classList.toggle("active", li.getAttribute("data-lang") === lang);
  });
}

// Load saved or default language
const userLang = localStorage.getItem("language") || "en";
loadLang(userLang);