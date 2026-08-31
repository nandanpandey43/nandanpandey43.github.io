/**
 * Renders the Projects section from projects.json.
 */
import { loadJSON, filterTemplates, arrowIcon, githubIcon } from '../utils.js';

/**
 * Render project cards as an interactive list.
 * @param {HTMLElement} container - The #projects-content element
 */
export async function renderProjects(container) {
    if (!container) return;

    const data = await loadJSON('./data/projects.json');
    if (!data) {
        container.innerHTML = '<p>Failed to load projects data.</p>';
        return;
    }

    const items = filterTemplates(data);

    container.innerHTML = items.map((project, i) => {
        const hasGithub = project.github && project.github.trim();
        const hasLive = project.live && project.live.trim();
        const category = project.category || '';

        const titleLink = hasGithub
            ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="${project.title} (opens in new tab)">${project.title}${arrowIcon()}</a>`
            : project.title;

        const tags = (project.stack || [])
            .map(t => `<span class="tag">${t}</span>`)
            .join('');

        let linksHTML = '';
        if (hasGithub || hasLive) {
            const links = [];
            if (hasGithub) {
                links.push(`<a class="item-link" href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="Source code">${githubIcon()} Source</a>`);
            }
            if (hasLive) {
                links.push(`<a class="item-link" href="${project.live}" target="_blank" rel="noopener noreferrer" aria-label="Live demo">Live</a>`);
            }
            linksHTML = `<div class="item-links">${links.join('')}</div>`;
        }

        return `
            <div class="interactive-item reveal" style="--stagger-delay: ${i * 80}ms">
                <div class="item-header">${category}</div>
                <div class="item-body">
                    <h3 class="item-title">${titleLink}</h3>
                    <p class="item-description">${project.description}</p>
                    ${tags ? `<div class="tag-list">${tags}</div>` : ''}
                    ${linksHTML}
                </div>
            </div>
        `;
    }).join('');
}
