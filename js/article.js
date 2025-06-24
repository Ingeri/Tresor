// articles
let articles = []; // Global variable to store fetched articles

// Function to fetch and display articles
async function fetchArticles() {
  try {
    const response = await fetch("articles/articles.json");
    const data = await response.json();
    articles = data; // Store the articles globally

    // Initially display all articles
    displayArticles(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}

// Function to display articles
// function displayArticles(filteredArticles) {
//   const articlesList = document.getElementById("articles-list");
//   articlesList.innerHTML = ""; // Clear any existing articles

//   filteredArticles.forEach((article) => {
//     const articleLink = document.createElement("a");
//     articleLink.href = `../articles/article/?id=${article.id}`;
//     articleLink.classList.add("article-link");
//     articleLink.textContent = article.title;

//     // Append the article link to the list
//     articlesList.appendChild(articleLink);
//   });
// }
function displayArticles(filteredArticles) {
  const articlesList = document.getElementById("articles-list");
  articlesList.innerHTML = ""; // Clear any existing articles

  filteredArticles.forEach((article) => {
    const articleItem = document.createElement("div");
    articleItem.classList.add("article-item");

    const articleLink = document.createElement("a");
    articleLink.href = `../articles/article/?id=${article.id}`;
    articleLink.classList.add("article-link");
    articleLink.textContent = article.title;

    const articleOverview = document.createElement("p");
    articleOverview.classList.add("article-overview");
    articleOverview.textContent = article.overview || "";

    articleItem.appendChild(articleLink);
    articleItem.appendChild(articleOverview);

    articlesList.appendChild(articleItem);
  });
}
  

// Real-time filtering function
function filterArticles() {
  const searchQuery = document
    .getElementById("search-input")
    .value.toLowerCase();

  // Get selected filters
  const filters = [];
  if (document.getElementById("filter-trending").checked)
    filters.push("Trending");
  if (document.getElementById("filter-featured").checked)
    filters.push("Featured");
  if (document.getElementById("filter-new").checked) filters.push("New");
  if (document.getElementById("filter-frontend").checked)
    filters.push("Frontend");
  if (document.getElementById("filter-backend").checked)
    filters.push("Backend");

  // Filter articles based on search query and selected filters
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery);
    const matchesFilters = filters.every(
      (filter) => article.filters && article.filters.includes(filter)
    );

    return matchesSearch && matchesFilters;
  });

  // Display filtered articles
  displayArticles(filteredArticles);
}

// Call the function to fetch articles when the page loads
fetchArticles();
