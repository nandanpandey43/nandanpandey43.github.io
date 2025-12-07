/**
 * Simple client-side router
 * Handles navigation state and highlighting active links
 * Note: Since this is a static site on GitHub Pages, we rely on actual HTML files
 * but this script helps with "active" states and potential SPA-like transitions if extended.
 */

export class Router {
    constructor() {
        this.currentPath = window.location.pathname;
        this.init();
    }

    init() {
        this.highlightActiveLink();
    }

    highlightActiveLink() {
        const links = document.querySelectorAll('.nav-links a');
        const currentPath = window.location.pathname.replace(/\/$/, ""); // Strip trailing slash

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            // Resolve relative href to absolute path for comparison
            const linkUrl = new URL(href, window.location.href);
            const linkPath = linkUrl.pathname.replace(/\/$/, "");

            // Main check: exact match
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
            // Handle index/root equivalence
            else if ((linkPath.endsWith('index.html') && currentPath === linkPath.replace('/index.html', '')) ||
                (currentPath.endsWith('index.html') && linkPath === currentPath.replace('/index.html', ''))) {
                link.classList.add('active');
            }
        });
    }
}
