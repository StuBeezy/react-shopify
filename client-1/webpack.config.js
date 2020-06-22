const path = require('path');
const getClientEnvironment = require('./config/env');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const preCSS = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssNormalize = require('postcss-normalize');

const paths = require('./config/paths');
const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: './index.js',
    output: {
        pathinfo: true,
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx|mjs)$/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1
                                }
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        require('postcss-preset-env')({
                                            autoprefixer: {
                                                flexbox: 'no-2009'
                                            },
                                            stage: 3
                                        }),
                                        postcssNormalize()
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [{
                            loader: require.resolve('style-loader')
                        }, {
                            loader: require.resolve('css-loader'),
                        }, {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                plugins: function () {
                                    return [
                                        preCSS,
                                        autoprefixer
                                    ];
                                }
                            }
                        }]
                    }
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [require.resolve('babel-loader')]
            },
        ]
    },
    plugins: [
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin(env.stringified),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "static/css/[name].[hash:8].css"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};