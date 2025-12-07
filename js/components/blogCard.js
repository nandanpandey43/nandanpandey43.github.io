import { formatDate } from '../utils.js';

export const BlogCard = ({ id, title, date, excerpt, filename, externalLink }) => {
    const link = externalLink || `./blog.html?post=${filename}`;
    const target = externalLink ? 'target="_blank" rel="noopener noreferrer"' : '';

    return `
    <article class="card fade-in">
        <span class="text-secondary text-mono" style="font-size: 0.8rem;">${formatDate(date)}</span>
        <h3 class="card-title mt-md"><a href="${link}" ${target}>${title}</a></h3>
        <p class="card-desc">${excerpt}</p>
        <a href="${link}" ${target} class="text-mono" style="font-size: 0.9rem;">Read more →</a>
    </article>
`;
};
