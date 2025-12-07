import { Navbar } from './components/navbar.js';
import { Footer } from './components/footer.js';
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mount Layout Components
    const navbarContainer = document.getElementById('navbar-root');
    const footerContainer = document.getElementById('footer-root');

    if (navbarContainer) {
        navbarContainer.innerHTML = Navbar();
    }

    if (footerContainer) {
        footerContainer.innerHTML = Footer();
    }

    // 2. Initialize Router (mainly for active link highlighting)
    new Router();

    // 3. Dynamic Page Logic
    // We detect which page we are on by checking for specific root elements
    const pageId = document.body.id;

    if (pageId === 'page-projects') {
        import('./renderProjects.js').then(module => module.initProjects());
    } else if (pageId === 'page-blogs') {
        import('./renderBlogs.js').then(module => module.initBlogs());
    } else if (pageId === 'page-experience') {
        import('./renderExperience.js').then(module => module.initExperience());
    } else if (pageId === 'page-blog-detail') {
        // Blog detail logic is slightly different, parses query param or similar
        // For static hosting, usually requires generating static HTML or using a generic player with query
        import('./renderBlogs.js').then(module => module.initBlogDetail());
    }
});
