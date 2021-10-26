const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],

    output: {
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new NodePolyfillWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        })
    ],
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
}