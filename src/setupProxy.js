const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.adidas.com/',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive',
      },
    })
  );
};
