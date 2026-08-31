/**
 * Renders the Experience timeline from experience.json.
 */
import { loadJSON, filterTemplates, arrowIcon } from '../utils.js';

/**
 * Render experience entries as an interactive timeline list.
 * @param {HTMLElement} container - The #experience-content element
 */
export async function renderExperience(container) {
    if (!container) return;

    const data = await loadJSON('./data/experience.json');
    if (!data) {
        container.innerHTML = '<p>Failed to load experience data.</p>';
        return;
    }

    const items = filterTemplates(data);

    container.innerHTML = items.map((job, i) => {
        const hasUrl = job.url && job.url.trim();
        const companyLink = hasUrl
            ? `<a href="${job.url}" target="_blank" rel="noopener noreferrer" aria-label="${job.role} at ${job.company} (opens in new tab)">${job.role} · <span>${job.company}${arrowIcon()}</span></a>`
            : `${job.role} · ${job.company}`;

        const tags = (job.stack || [])
            .map(t => `<span class="tag">${t}</span>`)
            .join('');

        return `
            <div class="interactive-item reveal" style="--stagger-delay: ${i * 80}ms">
                <div class="item-header">${job.duration}</div>
                <div class="item-body">
                    <h3 class="item-title">${companyLink}</h3>
                    <p class="item-description">${job.description}</p>
                    ${tags ? `<div class="tag-list">${tags}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}
