const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
    },
    plugins: [
        // new MinifyPlugin({ removeDebugger: true, removeConsole: true }, {}),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        }),
        new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
        // new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                test: /\.css$/,
                use: [
                    "style-loader", //3. Inject styles into DOM
                    "css-loader", //2. Turns css into commonjs
                ]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    reuseExistingChunk: true,
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    devServer: {
        contentBase: './build',
        hot: true
    }
};
