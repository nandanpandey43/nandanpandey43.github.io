export const Card = ({ title, description, stack, github, live }) => `
    <div class="card fade-in">
        <h3 class="card-title">${title}</h3>
        <p class="card-desc">${description}</p>
        <div class="card-tags">
            ${stack.map(tech => `<span class="tag">${tech}</span>`).join('')}
        </div>
        <div class="flex gap-md mt-md">
            <a href="${github}" target="_blank" rel="noopener noreferrer">GitHub</a>
            ${live ? `<a href="${live}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''}
        </div>
    </div>
`;
