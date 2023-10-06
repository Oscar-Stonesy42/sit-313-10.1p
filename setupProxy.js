const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Specify the API endpoints you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:4000', // Replace with your Express.js server's URL and port
      changeOrigin: true,
    })
  );
};
