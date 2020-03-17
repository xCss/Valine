const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const libraryName = 'Valine';
const version = require('./package.json').version
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
let BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

const plugins = [];
const banner =
  'Valine v' + version + '\n' +
  '(c) 2017-' + new Date().getFullYear() + ' xCss\n' +
  'Released under the GPL-2.0 License.\n' +
  'Last Update: ' + (new Date()).toLocaleString();

const TARGET = process.env
if(TARGET.NODE_ENV == 'production'){
    BUILD_PATH = path.resolve(ROOT_PATH, 'dist/'+version);
}

module.exports = env => {
    var dev = env && env.dev || false
    if (!dev) {
        plugins.push(new webpack.BannerPlugin(banner))
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true
        }));
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                cache:true,
                parallel:true,
                compress: {
                    warnings: false,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                    drop_console: true
                },
                sourceMap:false,
                uglifyOptions:{
                    output:{
                        // 删除所有的注释
                        comments: false,
                        beautify:false,
                        ascii_only:true
                    },
                    safari10:true
                }
            })
        );
    } else {
        plugins.push(new webpack.LoaderOptionsPlugin())
        plugins.push(new webpack.NamedModulesPlugin())
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    return {
        entry: {
            Valine: ['./src/index.scss', './src/index.js'],
            'Valine.Pure': './src/index.js'
            //'Valine.locales': './src/Valine.locales.js',
            // detect: './src/utils/detect.js',
            // escape: './src/utils/escape.js'
        },
        output: {
            path: BUILD_PATH,
            filename: '[name].min.js',
            library: libraryName,
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.js','.json', '.jsx','.css','.scss']
        },
        devtool: 'cheap-module-source-map',

        devServer: {
            hot: true,
            port: 8088,
            inline: true,
            host: '127.0.0.1',
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
                test: /\.js$/,
                use: {
                    loader:'babel-loader',
                    options:{
                        cacheDirectory:true,
                        compact:true
                    }
                },
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
