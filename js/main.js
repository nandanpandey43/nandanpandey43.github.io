/**
 * Main entry point — orchestrates theme, rendering, and effects.
 */
import { loadJSON, sunIcon, moonIcon, downloadIcon, viewIcon } from './utils.js';
import { renderSidebarSocials, updateSidebarBrand } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderAbout } from './sections/about.js';
import { renderExperience } from './sections/experience.js';
import { renderProjects } from './sections/projects.js';
import { renderBlogs } from './sections/blogs.js';
import { initSpotlight } from './effects/spotlight.js';
import { initReveal, initSectionTracker } from './effects/scrollReveal.js';

/* ── Theme ──────────────────────────────────────────────────── */

function getInitialTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.innerHTML = theme === 'dark' ? sunIcon() : moonIcon();
        btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
}

/* ── Resume section ─────────────────────────────────────────── */

async function renderResume(container) {
    if (!container) return;

    const profile = await loadJSON('./data/profile.json');
    const resumePath = profile?.resumePath || './assets/resume.pdf';

    container.innerHTML = `
        <div class="resume-actions">
            <a class="btn btn-accent" href="${resumePath}" target="_blank" rel="noopener noreferrer" aria-label="View resume PDF">
                ${viewIcon()} View Resume
            </a>
            <a class="btn" href="${resumePath}" download="Nandan_Pandey_SDE.pdf" aria-label="Download resume PDF">
                ${downloadIcon()} Download PDF
            </a>
        </div>
        <iframe
            class="resume-viewer"
            src="${resumePath}"
            title="Resume PDF viewer"
            loading="lazy"
        ></iframe>
        <div class="resume-mobile-note">
            <p>PDF viewer not available on mobile. Use the buttons above to view or download.</p>
        </div>
    `;
}

/* ── Contact section ────────────────────────────────────────── */

async function renderContact(container) {
    if (!container) return;

    const profile = await loadJSON('./data/profile.json');
    const email = profile?.email || '';

    container.innerHTML = `
        <div class="contact-cta">
            <h3>Let's build something reliable.</h3>
            <p>Available for backend engineering roles, API architecture, performance optimization, and distributed systems consulting.</p>
            ${email ? `
                <a class="contact-email" href="mailto:${email}?subject=Backend%20Engineering%20Opportunity" aria-label="Send email">
                    ${email} →
                </a>
            ` : '<p>Contact details available in resume.</p>'}
        </div>
    `;
}

/* ── Init ───────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Apply theme to <html> immediately (before any rendering)
    const theme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // 2. Render all sections in parallel
    await Promise.all([
        updateSidebarBrand(),
        renderSidebarSocials(document.getElementById('sidebar-socials')),
        renderAbout(document.getElementById('about-content')),
        renderExperience(document.getElementById('experience-content')),
        renderProjects(document.getElementById('projects-content')),
        renderBlogs(
            document.getElementById('blogs-search-container'),
            document.getElementById('blogs-content')
        ),
        renderResume(document.getElementById('resume-content')),
        renderContact(document.getElementById('contact-content')),
    ]);

    // 3. Render footer
    renderFooter(document.getElementById('footer-content'));

    // 4. Now that sidebar is rendered, update theme toggle button icon
    applyTheme(theme);

    // 5. Initialize effects (after content is in DOM)
    initSpotlight();
    initReveal();
    initSectionTracker();

    // 6. Theme toggle listener
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // 7. Scroll-to-top button (mobile)
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
