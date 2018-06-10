const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: false,
    entry: [
        './app/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'static/bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx$|\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread'],
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader',
                    publicPath: '.',
                }),
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg|cur)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: './resources/media/index/[name].[ext]',
                    },
                },
            },
        ],
    },
    devServer: {
        inline: true,
        port: 3000,
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            debug: true,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false,
            },
            compressor: {
                warnings: false,
            },
        }),
        new HtmlWebpackPlugin({
            template: `${__dirname}/app/index.html`,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
            },
        }),
        new ExtractTextPlugin('static/styles.css'),
    ],
};
