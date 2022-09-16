const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', //api 요청을 보낼 서버 주소
      changeOrigin: true,
    })
  );
};
