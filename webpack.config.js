const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPreconnectPlugin = require('html-webpack-preconnect-plugin');


module.exports = {
    mode: 'development',
    entry : './index.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
        new HtmlWebpackPreconnectPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                [
                                    "@babel/preset-react",
                                    {
                                        "runtime": "automatic"
                                    }
                                ]
                            ],
                        }
                    }
                ]
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.(png|svg|webp|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }, {
                test: /\.webmanifest$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                    {
                        loader: 'webpack-webmanifest-loader'
                    }
                ],
                type: 'asset/resource',
            },{
                test: /browserconfig\.xml$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "browserconfig.xml",
                        },
                    },
                    {
                        loader: "web-app-browserconfig-loader",
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },
};
