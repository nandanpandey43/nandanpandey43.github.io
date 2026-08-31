/**
 * Renders the Blog/Writing section from blogs.json.
 * Handles both local markdown posts and external links.
 * Includes search/filter functionality.
 */
import { loadJSON, filterTemplates, formatDate, arrowIcon, externalIcon, searchIcon } from '../utils.js';

let allBlogs = [];
let listContainer = null;
let isInitialRender = true;

/**
 * Render blog entries with search bar.
 * @param {HTMLElement} searchContainer - The #blogs-search-container element
 * @param {HTMLElement} contentContainer - The #blogs-content element
 */
export async function renderBlogs(searchContainer, contentContainer) {
    if (!contentContainer) return;
    listContainer = contentContainer;

    const data = await loadJSON('./data/blogs.json');
    if (!data) {
        contentContainer.innerHTML = '<p>Failed to load blog data.</p>';
        return;
    }

    allBlogs = filterTemplates(data);

    // Render search bar
    if (searchContainer) {
        searchContainer.innerHTML = `
            <div class="blog-search-wrapper">
                <span class="blog-search-icon">${searchIcon()}</span>
                <input
                    type="search"
                    class="blog-search"
                    id="blog-search-input"
                    placeholder="Search posts by title or tag…"
                    aria-label="Search blog posts"
                />
            </div>
        `;

        const input = document.getElementById('blog-search-input');
        if (input) {
            input.addEventListener('input', (e) => {
                filterBlogs(e.target.value.trim().toLowerCase());
            });
        }
    }

    // Render all blogs initially
    renderBlogList(allBlogs);
    isInitialRender = false;
}

/**
 * Filter blogs by search query (matches title, excerpt, tags).
 * @param {string} query
 */
function filterBlogs(query) {
    if (!query) {
        renderBlogList(allBlogs);
        return;
    }

    const filtered = allBlogs.filter(blog => {
        const title = (blog.title || '').toLowerCase();
        const excerpt = (blog.excerpt || '').toLowerCase();
        const tags = (blog.tags || []).join(' ').toLowerCase();
        return title.includes(query) || excerpt.includes(query) || tags.includes(query);
    });

    renderBlogList(filtered);
}

/**
 * Render the list of blog items.
 * On initial render: use 'reveal' class so IntersectionObserver can animate them in.
 * On search re-renders: use 'reveal is-visible' so items appear immediately.
 * @param {Array} blogs
 */
function renderBlogList(blogs) {
    if (!listContainer) return;

    if (!blogs.length) {
        listContainer.innerHTML = '<div class="blog-no-results">No posts match your search.</div>';
        return;
    }

    // After initial render, make items immediately visible (no stale observer issue)
    const revealClass = isInitialRender ? 'reveal' : 'reveal is-visible';

    listContainer.innerHTML = blogs.map((blog, i) => {
        const isExternal = blog.externalLink && blog.externalLink.trim();
        const isLocal = blog.filename && blog.filename.trim();

        let link, target, badge;

        if (isExternal) {
            link = blog.externalLink;
            target = 'target="_blank" rel="noopener noreferrer"';
            badge = `<span class="external-badge">${externalIcon()} External article</span>`;
        } else if (isLocal) {
            link = `./blog.html?post=${blog.filename}`;
            target = '';
            badge = '';
        } else {
            link = '#';
            target = '';
            badge = '';
        }

        const tags = (blog.tags || [])
            .map(t => `<span class="tag">${t}</span>`)
            .join('');

        return `
            <div class="interactive-item ${revealClass}" style="--stagger-delay: ${i * 80}ms">
                <div class="item-header">${formatDate(blog.date)}</div>
                <div class="item-body">
                    <h3 class="item-title">
                        <a href="${link}" ${target} aria-label="${blog.title}${isExternal ? ' (opens in new tab)' : ''}">${blog.title}${arrowIcon()}</a>
                    </h3>
                    <p class="item-description">${blog.excerpt}</p>
                    ${badge}
                    ${tags ? `<div class="tag-list">${tags}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

