var webpack = require('webpack');
var path = require('path');

module.exports = {
    //devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './src/Index.js'
    ],
    output: {
        filename: 'bundle.js'
    },
    watch: true,
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
        {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: ['babel-loader'],
            query: { presets: ['es2015'] }
        },
        { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};