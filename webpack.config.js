var path = require('path');
var webpack = require('webpack');
module.exports = {
    // 入口文件
    entry: [
        './src/js/index.js',
        'webpack/hot/dev-server', // 调用热重载hot
        'webpack-dev-server/client?http://localhost:8080' // 添加webpack-dev-server客户端
    ],
    output: {
        path: path.join(__dirname, 'dist'), // 指定打包后的目录
        publicPath: 'dist', // 指定资源文件引用的目录
        filename: 'bundle.js' // 指定打包为一个文件 bundle.js
    },
    plugins: [
        // 全局开启热代码替换 
        new webpack.HotModuleReplacementPlugin()
    ]
}