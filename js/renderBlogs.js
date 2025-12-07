import { loadJSON, loadMarkdown, formatDate } from './utils.js';
import { BlogCard } from './components/blogCard.js';
// Using specific CDN import for marked in JS if possible, but for static generic usage we often load script in HTML.
// However, user said "Vanilla JS (no frameworks)". Marked is a library.
// I will assume global 'marked' availability if I add the script tag to HTML, or use simple regex if strictly no libs.
// User requirement: "Use a lightweight JS markdown parser". I'll assume 'marked' via CDN in HTML is acceptable as 'lightweight parser'.
// If STRICT no external libs, I need a regex parser.
// Given "production-ready", regex parsers are risky. I will bank on allowing one lightweight lib script in HTML.

export async function initBlogs() {
    const list = document.getElementById('blogs-list');
    if (!list) return;

    list.innerHTML = '<div class="text-center">Loading posts...</div>';
    const blogs = await loadJSON('/data/blogs.json');

    if (!blogs) {
        list.innerHTML = '<div class="text-center text-secondary">Failed to load blogs.</div>';
        return;
    }

    list.innerHTML = blogs.map(blog => BlogCard(blog)).join('');
}

export async function initBlogDetail() {
    const container = document.getElementById('blog-content');
    const titleEl = document.getElementById('blog-title');
    const dateEl = document.getElementById('blog-date');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const filename = params.get('post');

    if (!filename) {
        container.innerHTML = '<p>Post not found.</p>';
        return;
    }

    // Load Metadata to get title/date (optional, or parse from Frontmatter if MD has it)
    // For simplicity, we fetch the MD content.
    // If we want title/date from JSON, we need to fetch blogs.json again or pass it.
    // Let's fetch blogs.json to find metadata first.
    const blogs = await loadJSON('/data/blogs.json');
    const meta = blogs ? blogs.find(b => b.filename === filename) : null;

    if (meta) {
        if (titleEl) titleEl.textContent = meta.title;
        if (dateEl) dateEl.textContent = formatDate(meta.date);
    }

    const markdown = await loadMarkdown(`/blogs/${filename}`);

    if (!markdown) {
        container.innerHTML = '<p>Failed to load content.</p>';
        return;
    }

    // Simple Render
    // If window.marked is available (via script tag), use it.
    if (window.marked) {
        container.innerHTML = window.marked.parse(markdown);
    } else {
        // Fallback or simple replace for basic needs if blocked
        container.innerHTML = markdown
            .replace(/^# (.*$)/gim, '') // Remove H1 as we render it separately
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>') // Code blocks
            .replace(/\n/gim, '<br />');
    }
}
