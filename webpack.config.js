const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports =

    {
        "mode": "development",
        "entry": "./src/index.js",
        "output": {
            "path": __dirname + '/dist',
            "filename": "[name].js"
        },
        "module": {
            "rules": [
                // {
                //     "enforce": "pre",
                //     "test": /\.(js|jsx)$/,
                //     "exclude": /node_modules/,
                //     // "use": "eslint-loader"
                // },
                {
                    "test": /\.js$/,
                    "exclude": /node_modules/,
                    "use": {
                        "loader": "babel-loader",
                        "options": {
                            "presets": [
                                "env"
                            ]
                        }
                    }
                },
                {
                    "test": /\.css$/,
                    use:['style-loader','css-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        // "plugins": [
        //     new MinifyPlugin({booleans:true}, {})
        // ],
    }

