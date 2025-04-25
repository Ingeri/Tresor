document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        "Art is not what you see, but what you make others see.",
        "Creativity takes courage.",
        "Every artist was first an amateur."
    ];

    let quoteIndex = 0;
    const quoteElement = document.querySelector(".quote");

    function typeQuote() {
        let quote = quotes[quoteIndex];
        quoteElement.textContent = ""; // Clear text
        let charIndex = 0;

        function type() {
            if (charIndex < quote.length) {
                quoteElement.textContent += quote.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50); // Adjust typing speed
            } else {
                setTimeout(eraseQuote, 2000); // Pause before erasing
            }
        }

        type();
    }

    function eraseQuote() {
        let quote = quoteElement.textContent;

        function erase() {
            if (quote.length > 0) {
                quote = quote.slice(0, -1);
                quoteElement.textContent = quote;
                setTimeout(erase, 20); // Adjust erase speed
            } else {
                quoteIndex = (quoteIndex + 1) % quotes.length; // Next quote
                setTimeout(typeQuote, 500); // Delay before next quote
            }
        }

        erase();
    }

    // Start typing effect
    typeQuote();
});

//
document.addEventListener("DOMContentLoaded", function () {
    let skills = document.querySelectorAll(".skill-fill");
    skills.forEach(skill => {
        let width = skill.classList.contains("html") ? "100%" :
            skill.classList.contains("css") ? "85%" :
                skill.classList.contains("js") ? "75%" :
                    skill.classList.contains("php") ? "60%" : "0%";
        skill.style.width = width;
    });
});

// 

const wrapper = document.querySelector('.testimonial-wrapper');
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;
const visibleTestimonials = 3;
let index = 0;
let interval;
const dotsContainer = document.querySelector('.dots-container');

// Create dots dynamically
for (let i = 0; i < totalTestimonials; i++) {
    let dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-index', i);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

// Clone first 3 testimonials for seamless transition
for (let i = 0; i < visibleTestimonials; i++) {
    let clone = testimonials[i].cloneNode(true);
    wrapper.appendChild(clone);
}

function moveSlider() {
    const screenWidth = window.innerWidth;
    let slideWidth;

    if (screenWidth >= 900) { // Large screens (desktop)
        slideWidth = 300; // Default width for desktop
    } else { // Treat medium and small screens the same
        slideWidth = 280; // Full width on mobile and tablet
    }

    index++;
    wrapper.style.transition = "transform 0.5s ease-in-out";
    wrapper.style.transform = `translateX(-${index * slideWidth}px)`;

    updateDots(index % totalTestimonials);

    // Reset to first set after last transition
    if (index === totalTestimonials) {
        setTimeout(() => {
            wrapper.style.transition = "none";
            wrapper.style.transform = `translateX(0px)`;
            index = 0;
        }, 500);
    }
}



function goToSlide(slideIndex) {
    index = slideIndex;
    wrapper.style.transition = "transform 0.5s ease-in-out";
    wrapper.style.transform = `translateX(-${index * 320}px)`;
    updateDots(index);
}

function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

function startSlider() {
    interval = setInterval(moveSlider, 2500);
}

function pauseSlider() {
    clearInterval(interval);
}

function resumeSlider() {
    startSlider();
}

startSlider();

//
const faqItems = document.querySelectorAll(".faq-item");
const modal = document.getElementById("faqModal");
const modalText = document.getElementById("modalText");
const modalQtn = document.getElementById("modalqtn"); // Get the question title element
const modalClose = document.querySelector(".modal-close");

faqItems.forEach(item => {
    item.addEventListener("click", () => {
        const question = item.querySelector(".faq-question").textContent; // Get question text
        const answer = item.querySelector(".faq-answer").innerHTML; // Get answer content

        modalQtn.textContent = question; // Set modal question
        modalText.innerHTML = answer; // Set modal answer
        modal.style.display = "block";
    });
});

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

//portifolio
function filterProjects(category) {
    let projects = document.querySelectorAll(".project");
    let buttons = document.querySelectorAll(".filter-buttons button");

    // Highlight the active button
    buttons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[onclick="filterProjects('${category}')"]`).classList.add("active");

    // First, hide all projects
    projects.forEach(project => {
        project.style.opacity = "0";
        project.style.transform = "scale(0.8)";
    });

    setTimeout(() => {
        projects.forEach(project => {
            project.style.display = "none"; // Hide them completely after animation
        });

        // Then, show only the filtered projects
        let filteredProjects = document.querySelectorAll(category === "all" ? ".project" : `.${category}`);
        filteredProjects.forEach(project => {
            project.style.display = "block";
            setTimeout(() => {
                project.style.opacity = "1";
                project.style.transform = "scale(1)";
            }, 50);
        });

    }, 300); // Delay hiding animation for smooth transition
}

//
function openImageModal(imageSrc) {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImg");
    modal.style.display = "flex";
    modalImg.src = imageSrc;
}

function openDetailsModal(detailsId) {
    let modal = document.getElementById("detailsModal");
    let modalBody = document.getElementById("modalBody");
    let detailsContent = document.getElementById(detailsId).innerHTML;

    modalBody.innerHTML = detailsContent;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
    document.getElementById("detailsModal").style.display = "none";
}

// gallery
// Open Image in Modal
function openModalGallery(imageSrc) {
    document.getElementById("imageModalGallery").style.display = "flex";
    document.getElementById("modalImgGallery").src = imageSrc;
}

// Close Modal
function closeModalGallery() {
    document.getElementById("imageModalGallery").style.display = "none";
}

// Select all gallery items
const galleryItems = document.querySelectorAll(".gallery-item");

// Track the currently active item
let activeItem = null;

galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        // Remove active class from the previous item
        if (activeItem && activeItem !== item) {
            activeItem.classList.remove("active-image");
        }

        // Set new active item
        item.classList.add("active-image");
        activeItem = item;
    });
});


// articles
 let articles = [];  // Global variable to store fetched articles

        // Function to fetch and display articles
        async function fetchArticles() {
            try {
                const response = await fetch('articles/articles.json');
                const data = await response.json();
                articles = data;  // Store the articles globally

                // Initially display all articles
                displayArticles(articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }

        // Function to display articles
        function displayArticles(filteredArticles) {
            const articlesList = document.getElementById('articles-list');
            articlesList.innerHTML = '';  // Clear any existing articles

            filteredArticles.forEach(article => {
                const articleLink = document.createElement('a');
                articleLink.href = `../articles/article-template.html?id=${article.id}`;
                articleLink.classList.add('article-link');
                articleLink.textContent = article.title;

                // Append the article link to the list
                articlesList.appendChild(articleLink);
            });
        }

        // Real-time filtering function
        function filterArticles() {
            const searchQuery = document.getElementById('search-input').value.toLowerCase();

            // Get selected filters
            const filters = [];
            if (document.getElementById('filter-trending').checked) filters.push("Trending");
            if (document.getElementById('filter-featured').checked) filters.push("Featured");
            if (document.getElementById('filter-new').checked) filters.push("New");
            if (document.getElementById('filter-frontend').checked) filters.push("Frontend");
            if (document.getElementById('filter-backend').checked) filters.push("Backend");

            // Filter articles based on search query and selected filters
            const filteredArticles = articles.filter(article => {
                const matchesSearch = article.title.toLowerCase().includes(searchQuery);
                const matchesFilters = filters.every(filter => article.filters && article.filters.includes(filter));

                return matchesSearch && matchesFilters;
            });

            // Display filtered articles
            displayArticles(filteredArticles);
        }

        // Call the function to fetch articles when the page loads
        fetchArticles();
        
        //
        function toggleSidebar() {
            document.querySelector('.sidebar').classList.toggle('active');
        }
        
        // Close sidebar when clicking outside (on mobile only)
        document.addEventListener("click", function (event) {
            const sidebar = document.querySelector(".sidebar");
            const mobileIcon = document.querySelector(".mobile-icon");
        
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(event.target) && !mobileIcon.contains(event.target)) {
                    sidebar.classList.remove("active");
                }
            }
        });
        