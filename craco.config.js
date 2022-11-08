const path = require('path');

module.exports = {
    //webpack 配置
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}