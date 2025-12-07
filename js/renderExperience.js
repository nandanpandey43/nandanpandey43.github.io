import { loadJSON } from './utils.js';

export async function initExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    timeline.innerHTML = '<div class="text-center">Loading experience...</div>';
    const experience = await loadJSON('./data/experience.json');

    if (!experience) {
        timeline.innerHTML = '<div class="text-center">Failed to load experience.</div>';
        return;
    }

    timeline.innerHTML = experience.map(job => `
        <div class="card fade-in" style="margin-bottom: 2rem; border-left: 4px solid var(--accent-color);">
            <div class="flex justify-between items-center" style="flex-wrap: wrap;">
                <h3 class="card-title" style="margin:0;">${job.role}</h3>
                <span class="text-mono text-secondary" style="font-size: 0.9rem;">${job.duration}</span>
            </div>
            <h4 class="text-secondary" style="margin-top: 0.5rem; font-weight: 500;">${job.company}</h4>
            <p class="mt-md">${job.description}</p>
        </div>
    `).join('');
}
