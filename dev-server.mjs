import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = __dirname;
const port = Number(process.argv[2] || 5500);

const mime = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.md': 'text/markdown; charset=utf-8'
};

function sendFile(res, filePath, status = 200) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(status, {
        'Content-Type': mime[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
    });
    createReadStream(filePath).pipe(res);
}

function safePath(urlPath) {
    const decoded = decodeURIComponent(urlPath.split('?')[0]);
    const normalized = path.normalize(decoded).replace(/^\/+/, '');
    return path.join(root, normalized);
}

http.createServer((req, res) => {
    const requested = safePath(req.url || '/');

    if (requested.startsWith(root) && existsSync(requested)) {
        const stats = statSync(requested);

        if (stats.isFile()) {
            sendFile(res, requested);
            return;
        }

        if (stats.isDirectory()) {
            const indexPath = path.join(requested, 'index.html');
            if (existsSync(indexPath)) {
                sendFile(res, indexPath);
                return;
            }
        }
    }

    const fallback404 = path.join(root, '404.html');
    if (existsSync(fallback404)) {
        sendFile(res, fallback404, 404);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
}).listen(port, () => {
    console.log(`Portfolio dev server running on http://localhost:${port}`);
});
