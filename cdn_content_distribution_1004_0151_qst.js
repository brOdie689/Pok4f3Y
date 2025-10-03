// 代码生成时间: 2025-10-04 01:51:22
 * serving static files from a directory and allowing content to be cached
 * and delivered from multiple locations.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple cache storage
const cache = {};

// Constants
const PORT = 3000;
const CONTENT_DIR = './public'; // Directory to serve files from

// Utility function to read file from disk or cache
function getFileContent(filePath, response) {
  if (cache[filePath]) {
    // Serve from cache
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(cache[filePath]);
  } else {
    // Serve from disk and update cache
    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.writeHead(404);
        response.end('File not found.');
      } else {
        cache[filePath] = content.toString();
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(content);
      }
    });
  }
}

// Create HTTP server
const server = http.createServer((request, response) => {
  // Simple routing
  if (request.method === 'GET') {
    const filePath = path.join(CONTENT_DIR, request.url === '/' ? '/index.html' : request.url);
    getFileContent(filePath, response);
  } else {
    response.writeHead(405);
    response.end('Method Not Allowed');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Make sure to handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});