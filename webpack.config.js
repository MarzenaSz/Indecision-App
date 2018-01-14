const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, 
        {
            test: /\.css$/
        }]
    },
    // for debugging
    devtool: 'cheap-module-eval-source-map',
    // server
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};