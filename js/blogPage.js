/**
 * Blog detail page — loads markdown content and renders it.
 * Handles reading time, metadata, and markdown parsing.
 */
import { loadJSON, loadMarkdown, formatDate, readingTime, filterTemplates } from './utils.js';

async function initBlogPage() {
    const container = document.getElementById('blog-content');
    const titleEl = document.getElementById('blog-title');
    const dateEl = document.getElementById('blog-date');
    const readTimeEl = document.getElementById('blog-reading-time');

    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const filename = params.get('post');

    if (!filename) {
        container.innerHTML = '<p>Post not found.</p>';
        if (titleEl) titleEl.textContent = 'Post Not Found';
        return;
    }

    // Load blog metadata
    const blogsData = await loadJSON('./data/blogs.json');
    const blogs = blogsData ? filterTemplates(blogsData) : [];
    const meta = blogs.find(b => b.filename === filename);

    if (meta) {
        if (titleEl) titleEl.textContent = meta.title;
        if (dateEl) dateEl.textContent = formatDate(meta.date);
        // Update page title
        document.title = `${meta.title} | Nandan Pandey`;
    }

    // Load markdown content
    const markdown = await loadMarkdown(`./blogs/${filename}`);

    if (!markdown) {
        container.innerHTML = '<p>Failed to load article content.</p>';
        return;
    }

    // Calculate reading time (only for local posts)
    if (readTimeEl) {
        readTimeEl.textContent = `· ${readingTime(markdown)}`;
    }

    // Render markdown
    if (window.marked) {
        container.innerHTML = window.marked.parse(markdown);
    } else {
        // Fallback: basic markdown → HTML
        container.innerHTML = markdown
            .replace(/^# (.*$)/gim, '') // Remove h1 (we have it in header)
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            .replace(/\n/gim, '<br>');
    }
}

document.addEventListener('DOMContentLoaded', initBlogPage);
