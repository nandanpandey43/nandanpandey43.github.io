import { loadJSON } from './utils.js';
import { Card } from './components/card.js';

export async function initProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '<div class="text-center">Loading projects...</div>';

    const projects = await loadJSON('/data/projects.json');

    if (!projects) {
        grid.innerHTML = '<div class="text-center text-secondary">Failed to load projects.</div>';
        return;
    }

    grid.innerHTML = projects.map(project => Card(project)).join('');
}
