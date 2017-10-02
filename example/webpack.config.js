const webpack = require('webpack');
const path = require('path');

const resolve = path.resolve;

module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            './index',
        ],
    },
    context: resolve(__dirname, 'src'),
    output: {
        filename: 'bundle-[name].js',
        sourceMapFilename: 'bundle-[name].js.map',
        pathinfo: true,
        publicPath: '/static/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    devtool: 'module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        ],
    },
};
