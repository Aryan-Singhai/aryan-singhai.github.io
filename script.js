const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";

    const closeMenu = () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    };

    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach((item) => item.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
        if (!navLinks.classList.contains("active")) return;
        if (navLinks.contains(event.target) || menuToggle.contains(event.target)) return;
        closeMenu();
    });
}

/* Site-wide professional icons for social, contact and resume links */
const iconSvgs = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 8.5H3.2V21h3.3V8.5ZM4.85 3A2 2 0 1 0 4.85 7 2 2 0 0 0 4.85 3ZM21 13.8c0-3.76-2-5.5-4.66-5.5-2.14 0-3.1 1.18-3.64 2v-1.8H9.4V21h3.3v-6.18c0-1.63.31-3.21 2.33-3.21 1.99 0 2.02 1.86 2.02 3.32V21H21v-7.2Z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.47.09.64-.2.64-.45v-1.74c-2.61.57-3.16-1.11-3.16-1.11-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.23 1.03 2.78.79.09-.62.33-1.03.6-1.27-2.08-.24-4.27-1.04-4.27-4.63 0-1.02.36-1.85.97-2.5-.1-.24-.42-1.2.09-2.48 0 0 .79-.25 2.6.96A9 9 0 0 1 12 7.2a9 9 0 0 1 2.37.32c1.8-1.21 2.59-.96 2.59-.96.52 1.28.2 2.24.1 2.48.6.65.96 1.48.96 2.5 0 3.6-2.2 4.39-4.28 4.63.34.29.64.84.64 1.7v2.69c0 .26.17.55.65.45A9.5 9.5 0 0 0 12 2.5Z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5 5.5h17A1.5 1.5 0 0 1 22 7v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 17V7a1.5 1.5 0 0 1 1.5-1.5Zm0 2.1v.2l8.5 5.55 8.5-5.55v-.2h-17Zm17 2.72-7.68 5.02a1.5 1.5 0 0 1-1.64 0L3.5 10.32V17h17v-6.68Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.1 3.5h3l1.15 4.15-1.82 1.46a14.2 14.2 0 0 0 5.46 5.46l1.46-1.82 4.15 1.15v3A2.6 2.6 0 0 1 17.9 19.5C10.48 19.03 4.97 13.52 4.5 6.1A2.6 2.6 0 0 1 7.1 3.5Z"/></svg>',
    resume: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 2.5h8l4 4V21a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 21V4A1.5 1.5 0 0 1 6.5 2.5H6Zm7.5 1.8V8h3.7l-3.7-3.7ZM8 11h8v1.6H8V11Zm0 3.5h8v1.6H8v-1.6Zm0 3.5h5v1.6H8V18Z"/></svg>'
};

const addIconStyles = () => {
    if (document.getElementById("site-icon-styles")) return;
    const style = document.createElement("style");
    style.id = "site-icon-styles";
    style.textContent = `
        .site-action-icon { width: 1em; height: 1em; flex: 0 0 1em; display: inline-block; vertical-align: -0.14em; fill: currentColor; }
        .site-action-with-icon { display: inline-flex !important; align-items: center; gap: .48em; }
    `;
    document.head.appendChild(style);
};

const addSiteIcon = (link, type) => {
    if (!link || link.querySelector(".site-action-icon")) return;
    addIconStyles();
    link.classList.add("site-action-with-icon");
    link.insertAdjacentHTML("afterbegin", iconSvgs[type]);
    link.querySelector("svg").classList.add("site-action-icon");
};

document.querySelectorAll('a[href*="linkedin.com"]').forEach((link) => addSiteIcon(link, "linkedin"));
document.querySelectorAll('a[href*="github.com"]').forEach((link) => addSiteIcon(link, "github"));
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => addSiteIcon(link, "email"));
document.querySelectorAll('a[href^="tel:"]').forEach((link) => addSiteIcon(link, "phone"));
document.querySelectorAll('a[href*=".pdf"]').forEach((link) => addSiteIcon(link, "resume"));
