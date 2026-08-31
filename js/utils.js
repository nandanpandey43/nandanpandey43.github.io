/**
 * Shared utility functions for data loading, DOM helpers, and formatting.
 */

/**
 * Fetch and parse a JSON file. Returns null on failure.
 * @param {string} path - Relative path to JSON file
 * @returns {Promise<any|null>}
 */
export async function loadJSON(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error(`[loadJSON] ${path}:`, err);
        return null;
    }
}

/**
 * Fetch a markdown file as text. Returns empty string on failure.
 * @param {string} path - Relative path to .md file
 * @returns {Promise<string>}
 */
export async function loadMarkdown(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return await res.text();
    } catch (err) {
        console.error(`[loadMarkdown] ${path}:`, err);
        return '';
    }
}

/**
 * Format a date string (YYYY-MM-DD) to a readable form.
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Estimate reading time from text content.
 * @param {string} text
 * @returns {string} e.g., "4 min read"
 */
export function readingTime(text) {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
}

/**
 * Filter out template entries (items with _template: true) from data arrays.
 * @param {Array} items
 * @returns {Array}
 */
export function filterTemplates(items) {
    return items.filter(item => !item._template);
}

/**
 * SVG icon for external link arrow.
 * @returns {string}
 */
export function arrowIcon() {
    return `<svg class="link-arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"/></svg>`;
}

/**
 * SVG icon for external link indicator (small).
 * @returns {string}
 */
export function externalIcon() {
    return `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22H12.25a.75.75 0 01-.75-.75z"/></svg>`;
}

/**
 * GitHub SVG icon.
 * @returns {string}
 */
export function githubIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.57v-2.02c-3.34.73-4.04-1.41-4.04-1.41-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.09-.74.09-.74 1.21.09 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.51 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.53.12-3.19 0 0 1-.33 3.3 1.24a11.4 11.4 0 0 1 6 0c2.29-1.57 3.29-1.24 3.29-1.24.66 1.66.24 2.89.12 3.19.77.85 1.24 1.93 1.24 3.25 0 4.62-2.81 5.65-5.49 5.94.43.38.81 1.11.81 2.24v3.32c0 .31.22.69.83.57A12 12 0 0 0 12 .5Z"/></svg>`;
}

/**
 * LinkedIn SVG icon.
 * @returns {string}
 */
export function linkedinIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46A1.77 1.77 0 0 0 24 22.23V1.77A1.77 1.77 0 0 0 22.23 0Z"/></svg>`;
}

/**
 * Twitter/X SVG icon.
 * @returns {string}
 */
export function twitterIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93L18.9 1.15Zm-1.29 19.49h2.04L6.49 3.23H4.3l13.31 17.41Z"/></svg>`;
}

/**
 * Medium SVG icon.
 * @returns {string}
 */
export function mediumIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`;
}

/**
 * Search SVG icon.
 * @returns {string}
 */
export function searchIcon() {
    return `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/></svg>`;
}

/**
 * Download SVG icon.
 * @returns {string}
 */
export function downloadIcon() {
    return `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"/><path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"/></svg>`;
}

/**
 * Eye/view SVG icon.
 * @returns {string}
 */
export function viewIcon() {
    return `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/><path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>`;
}

/**
 * Sun icon (for theme toggle - switch to light).
 * @returns {string}
 */
export function sunIcon() {
    return `<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm-8-5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm13 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10zM4.343 4.343a.75.75 0 011.061 0l1.06 1.06a.75.75 0 01-1.06 1.061l-1.06-1.06a.75.75 0 010-1.06zm9.193 9.193a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM4.343 15.657a.75.75 0 010-1.06l1.06-1.061a.75.75 0 111.061 1.06l-1.06 1.061a.75.75 0 01-1.061 0zm9.193-9.193a.75.75 0 010-1.061l1.061-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.061 0zM10 7a3 3 0 100 6 3 3 0 000-6z"/></svg>`;
}

/**
 * Moon icon (for theme toggle - switch to dark).
 * @returns {string}
 */
export function moonIcon() {
    return `<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.867.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd"/></svg>`;
}
