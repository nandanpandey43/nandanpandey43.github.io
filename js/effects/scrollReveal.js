/**
 * Scroll-triggered reveal and active section tracking.
 * Uses IntersectionObserver — no external libraries.
 */

/**
 * Observe elements with class `.reveal` and add `.is-visible` when they enter viewport.
 */
export function initReveal() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (reducedMotion) {
        // If user prefers reduced motion, make everything visible immediately
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Once visible, stop observing
            }
        });
    }, {
        rootMargin: '0px 0px -60px 0px', // Trigger slightly before fully in view
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}

/**
 * Track which section is currently in viewport and update nav links.
 * Updates both desktop sidebar nav and mobile bottom nav.
 * Only one section is ever highlighted — the topmost one currently in view.
 * When scrolling between sections (gap), the last active section stays highlighted.
 */
export function initSectionTracker() {
    const sections = Array.from(document.querySelectorAll('.section[id]'));
    const navLinks = document.querySelectorAll('.section-nav a');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (!sections.length) return;

    const visibleSections = new Set();
    let lastActiveHref = '#about'; // default to first section

    const setActive = (href) => {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === href);
        });
        mobileLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === href);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleSections.add(entry.target.id);
            } else {
                visibleSections.delete(entry.target.id);
            }
        });

        // Pick the topmost visible section (by DOM order)
        let activeHref = null;
        for (const section of sections) {
            if (visibleSections.has(section.id)) {
                activeHref = `#${section.id}`;
                break;
            }
        }

        if (activeHref) {
            lastActiveHref = activeHref;
            setActive(activeHref);
        } else {
            // Between sections — keep last active highlighted
            setActive(lastActiveHref);
        }
    }, {
        // Wide detection zone: starts 10% from top, ends 10% from bottom
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}
