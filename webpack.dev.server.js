var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');
var compiler = webpack(config);
// 创建服务器实例
var server = new WebpackDevServer(compiler, {
    hot: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
});
server.listen(8080, 'localhost', function() {});