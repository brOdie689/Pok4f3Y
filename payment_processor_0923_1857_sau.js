// 代码生成时间: 2025-09-23 18:57:31
const { createServer } = require('http');
const { parse } = require('url');

// Helper function to simulate payment processing
function processPayment(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve('Payment successful');
      } else {
        reject(new Error('Payment failed'));
      }
    }, 1000);
  });
}

// Function to handle incoming requests
function handleRequest(request, response) {
  const { pathname, query } = parse(request.url, true);
  
  if (pathname === '/process-payment') {
    const { amount } = query;
    
    if (amount) {
      processPayment(parseFloat(amount))
        .then(result => {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: result }));
        })
        .catch(error => {
          response.writeHead(500, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: error.message }));
        });
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Amount parameter is required' }));
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not Found' }));
  }
}

// Create HTTP server and listen on port 3000
createServer(handleRequest).listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Documentation
/*
 * This is a simple payment processor server written in Node.js.
 * It listens for HTTP requests to process payments and returns a JSON response.
 * The payment processing is simulated with a random success/failure rate.
 * Requests to '/process-payment' with a query parameter 'amount' are processed.
 * If 'amount' is not provided, a 400 error is returned.
 * If the payment processing fails, a 500 error is returned.
 * Otherwise, a success message is returned with a 200 status code.
 */