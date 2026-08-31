/**
 * Renders the footer content.
 */

/**
 * Render minimal footer.
 * @param {HTMLElement} container - The #footer-content element
 */
export function renderFooter(container) {
    if (!container) return;

    const year = new Date().getFullYear();

    container.innerHTML = `
        <p>
            Built with vanilla HTML, CSS & JS — no frameworks, no build step.<br>
            &copy; ${year} Nandan Pandey
        </p>
    `;
}
