/**
 * Renders sidebar social links and theme toggle from profile.json.
 */
import {
    loadJSON,
    githubIcon, linkedinIcon, twitterIcon, mediumIcon,
    sunIcon, moonIcon
} from '../utils.js';

/**
 * Render social links and theme toggle in the sidebar bottom area.
 * @param {HTMLElement} container - The #sidebar-socials element
 */
export async function renderSidebarSocials(container) {
    if (!container) return;

    const profile = await loadJSON('./data/profile.json');
    const social = profile?.social || {};

    const socialLinks = [];

    if (social.github) {
        socialLinks.push(`<a class="social-link" href="${social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">${githubIcon()}</a>`);
    }
    if (social.linkedin) {
        socialLinks.push(`<a class="social-link" href="${social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">${linkedinIcon()}</a>`);
    }
    if (social.twitter) {
        socialLinks.push(`<a class="social-link" href="${social.twitter}" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" title="Twitter / X">${twitterIcon()}</a>`);
    }
    if (social.medium) {
        socialLinks.push(`<a class="social-link" href="${social.medium}" target="_blank" rel="noopener noreferrer" aria-label="Medium" title="Medium">${mediumIcon()}</a>`);
    }

    container.innerHTML = `
        ${socialLinks.join('')}
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme">
            ${sunIcon()}
        </button>
    `;
}

/**
 * Update sidebar brand text from profile.json.
 */
export async function updateSidebarBrand() {
    const profile = await loadJSON('./data/profile.json');
    if (!profile) return;

    const titleEl = document.getElementById('sidebar-title');
    const taglineEl = document.getElementById('sidebar-tagline');

    if (titleEl && profile.title) titleEl.textContent = profile.title;
    if (taglineEl && profile.tagline) taglineEl.textContent = profile.tagline;
}
