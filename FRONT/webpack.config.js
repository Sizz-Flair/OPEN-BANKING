const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './bundleFolder'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,    //
                exclude: "/node_modules/",
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}