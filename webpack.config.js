const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const libraryName = 'Valine';
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var plugins = [];

module.exports = env => {
    var dev = env && env.dev || false
    if (!dev) {
        plugins.push(
            new UglifyJsPlugin({
                sourceMap:false,
                uglifyOptions:{
                    output:{
                        beautify:false
                    },
                    safari10:true
                }
            })
        );
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true
        }));
    } else {
        plugins.push(new webpack.LoaderOptionsPlugin())
        plugins.push(new webpack.NamedModulesPlugin())
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    return {
        entry: {
            Valine: ['./src/index.scss', './src/index.js'],
            // Valine:'./src/index.js',
            // 'ValinePure': './src/Valine.js',
            //'Valine.locales': './src/Valine.locales.js',
            // detect: './src/utils/detect.js',
            // escape: './src/utils/escape.js'
        },
        output: {
            path: BUILD_PATH,
            filename: '[name].min.js',
            library: '[name]',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },

        resolve: {
            extensions: ['.js', '.jsx']
        },
        devtool: 'cheap-module-source-map',

        devServer: {
            hot: true,
            port: 8088,
            inline: true,
            host: '0.0.0.0',
            publicPath:'/dist/',
            compress: true,
            stats: 'errors-only', //只在发生错误时输出
            overlay: { //当有编译错误或者警告的时候显示一个全屏overlay
                errors: true,
                warnings: true,
            }
        },

        module: {
            rules: [{
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
                include: APP_PATH
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['url-loader?limit=1024*10']
                //loader: 'url-loader?limit=40000'
            }]
        },

        plugins: plugins
    }
};