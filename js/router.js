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

        // Normalize path handling for GitHub Pages project roots if needed
        // For now, simple exact matching or trailing slash handling
        let path = this.currentPath;
        if (path.endsWith('/') && path !== '/') {
            path = path.slice(0, -1);
        }

        // Handle root
        if (path === '/' || path.endsWith('index.html')) {
            const homeLink = document.querySelector('.nav-links a[href="/"]');
            if (homeLink) homeLink.classList.add('active');
            return;
        }

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && path.includes(href) && href !== '/') {
                link.classList.add('active');
            }
        });
    }
}
