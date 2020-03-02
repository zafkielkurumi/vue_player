module.exports = {
    publicPath: '/',
    devServer: {
        overlay: {
            errors: false
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/"
                }
            }
        },
    },
    configureWebpack: config => {
        const path = require('path');
        function resolve(dir) {
            return path.join(__dirname, dir)
        }
        config.resolve.alias = {
            '@': resolve('src'),
            '@assets': resolve('src/assets'),

        }

    }
}