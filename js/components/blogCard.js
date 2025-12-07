import { formatDate } from '../utils.js';

export const BlogCard = ({ id, title, date, excerpt, filename }) => `
    <article class="card fade-in">
        <span class="text-secondary text-mono" style="font-size: 0.8rem;">${formatDate(date)}</span>
        <h3 class="card-title mt-md"><a href="/blog.html?post=${filename}">${title}</a></h3>
        <p class="card-desc">${excerpt}</p>
        <a href="/blog.html?post=${filename}" class="text-mono" style="font-size: 0.9rem;">Read more →</a>
    </article>
`;
