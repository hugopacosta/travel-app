const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

process.traceDeprecation = true;

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        path: path.join(__dirname, 'public'),
        libraryTarget: 'var',
        library: 'Client'
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [{
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.join(__dirname, 'public')
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                // Exposes jQuery for use outside Webpack build
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                    exposes: ["$", "jQuery"],
                },
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: 'main.css',
        })
    ],
    externals: {
        jQuery: 'jquery'
    }
}