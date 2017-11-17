var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var libraryName = 'Valine';
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var plugins = [];

module.exports = env => {
    let dev = env && env.dev || false
    if (!dev) {
        console.log(1)
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
                sourceMap: false,
                compress: {
                  // 在UglifyJs删除没有用到的代码时不输出警告  
                  warnings: false,
                  // 删除所有的 `console` 语句
                  drop_console: true,
                }
            })
        );
        plugins.push(new webpack.LoaderOptionsPlugin({minimize:true}));
    }
    plugins.push(new webpack.NamedModulesPlugin())
    plugins.push(new webpack.HotModuleReplacementPlugin())
    return {
        entry: './src/' + libraryName + '.js',
        output: {
            path: BUILD_PATH,
            filename: libraryName + '.min.js',
            library: libraryName,
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
    
        devtool: 'source-map',
    
        devServer: {
            hot:true,
            port: 8088,
            inline:true,
            progress:true,
            host:'0.0.0.0',
            publicPath: "/dist/"
        },
    
        module: {
            rules: [{
                    test: /\.js$/,
                    loader:'babel-loader',
                    include: [APP_PATH],
                    exclude: /node_modules/
                },{
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ],
                    include: APP_PATH
                },{ 
                    test: /\.css$/, 
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                },{
                    test: /\.(png|jpg|gif)$/,
                    use:['url-loader?limit=8192']
                    //loader: 'url-loader?limit=40000'
                }
            ]
        },
    
        plugins: plugins
    }
};