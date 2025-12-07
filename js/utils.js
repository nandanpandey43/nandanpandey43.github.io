export async function loadJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading JSON:", error);
        return null; // Return null to handle errors gracefully in components
    }
}

export async function loadMarkdown(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error("Error loading Markdown:", error);
        return "";
    }
}

export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

export function injectStyles(cssHelper) {
    // Helper if we need dynamic style injection, though main CSS is preferred
}
