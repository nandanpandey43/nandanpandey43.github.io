/**
 * Cursor spotlight effect.
 * Updates CSS custom properties --cursor-x and --cursor-y on mousemove.
 * Only active on desktop (pointer: fine) to avoid mobile perf issues.
 */
export function initSpotlight() {
    const spotlight = document.querySelector('.spotlight');
    if (!spotlight) return;

    // Only enable on devices with a fine pointer (mouse/trackpad)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) {
        spotlight.style.opacity = '0';
        return;
    }

    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        spotlight.style.opacity = '0';
        return;
    }

    let rafId = null;

    document.addEventListener('mousemove', (e) => {
        if (rafId) return; // Throttle to one update per frame
        rafId = requestAnimationFrame(() => {
            spotlight.style.setProperty('--cursor-x', `${e.clientX}px`);
            spotlight.style.setProperty('--cursor-y', `${e.clientY}px`);
            rafId = null;
        });
    });

    // Fade out when mouse leaves the viewport
    document.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        spotlight.style.opacity = '1';
    });
}
