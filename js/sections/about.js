/**
 * Renders the About section from profile.json + skills.json.
 */
import { loadJSON, filterTemplates } from '../utils.js';

/**
 * Render the about section content.
 * @param {HTMLElement} container - The #about-content element
 */
export async function renderAbout(container) {
    if (!container) return;

    const [profile, skills] = await Promise.all([
        loadJSON('./data/profile.json'),
        loadJSON('./data/skills.json')
    ]);

    if (!profile) {
        container.innerHTML = '<p>Failed to load profile data.</p>';
        return;
    }

    // Build about paragraphs
    const aboutHTML = (profile.about || [])
        .map(p => `<p>${p}</p>`)
        .join('');

    // Build metrics
    const metricsHTML = (profile.metrics || [])
        .map(m => `
            <div class="metric reveal">
                <span class="metric-value">${m.value}</span>
                <span class="metric-label">${m.label}</span>
            </div>
        `).join('');

    // Build skills
    let skillsHTML = '';
    if (skills) {
        const categories = Object.entries(skills);
        skillsHTML = `
            <div class="skills-section">
                ${categories.map(([category, items]) => `
                    <div class="skills-category">
                        <div class="skills-category-label">${formatCategoryLabel(category)}</div>
                        <div class="skills-list">
                            ${items.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Availability badge
    const availabilityHTML = profile.availability
        ? `<div class="availability-badge">
            <span class="availability-dot"></span>
            ${profile.availability}
           </div>`
        : '';

    container.innerHTML = `
        <div class="section-text reveal">
            ${aboutHTML}
        </div>
        ${metricsHTML ? `<div class="metrics-row">${metricsHTML}</div>` : ''}
        ${skillsHTML}
        ${availabilityHTML}
    `;
}

/**
 * Format a camelCase or snake_case category name to a readable label.
 * e.g. "databases" → "Databases", "infrastructure" → "Infrastructure"
 */
function formatCategoryLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/^\w/, c => c.toUpperCase())
        .trim();
}
