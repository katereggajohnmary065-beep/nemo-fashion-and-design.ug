const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Replace this with NEMO's real WhatsApp number.
const whatsappNumber = "256700000000";

// Mobile navigation
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

// Highlight the current section in the navigation
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
    let currentSection = "home";

    sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 150) {
            currentSection = section.id;
        }
    });

    navItems.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });
});

// Search products as the customer types
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");
const productCount = document.getElementById("productCount");

searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    let visibleProducts = 0;

    productCards.forEach(function (card) {
        const matches = card.textContent.toLowerCase().includes(query);

        card.hidden = !matches;

        if (matches) {
            visibleProducts++;
        }
    });

    noResults.hidden = visibleProducts !== 0;

    productCount.textContent =
        visibleProducts + (visibleProducts === 1 ? " product" : " products");
});

// Send product enquiries through WhatsApp
document.querySelectorAll(".enquire-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const product = button.dataset.product;

        const message =
            "Hello NEMO! I'm interested in " + product +
            ". Could you please tell me more about it?";

        const url =
            "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(message);

        window.open(url, "_blank", "noopener,noreferrer");
    });
});

// Contact form: prepare a WhatsApp message
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all the fields.";
        return;
    }

    const whatsappMessage =
        "Hello NEMO!\n\n" +
        "My name is: " + name + "\n" +
        "My email: " + email + "\n\n" +
        "My enquiry: " + message;

    const url =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(whatsappMessage);

    window.open(url, "_blank", "noopener,noreferrer");

    formStatus.textContent =
        "Your message is ready in WhatsApp. Send it to complete your enquiry.";
});

// Update the year automatically
document.getElementById("year").textContent =
    new Date().getFullYear();
