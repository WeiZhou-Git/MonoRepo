const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy.createProxyMiddleware('/CLOUD', {
        target: process.env.REACT_APP_CLOUD,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/CLOUD": "/"
        }
    }));
    
};