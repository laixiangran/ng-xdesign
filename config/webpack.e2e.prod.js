/**
 * @file webpack prod config
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackCommonConfig = require('./webpack.e2e.common');
const helper = require('./helper');

module.exports = webpackMerge(webpackCommonConfig, {
    mode: 'production',
    devtool: 'source-map',

    output: {
        filename: '[name].[chunkhash:6].bundle.js',
        sourceMapFilename: '[name].[chunkhash:6].bundle.map',
        chunkFilename: '[id].[chunkhash:6].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                include: [helper.root('src/asset/less')]
            },

            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                }),
                include: [helper.root('src/asset/less')]
            }
        ]
    },

    plugins: [
        // remove docs
        new CleanWebpackPlugin([helper.root('dist/e2e')], {
            root: helper.root('.')
        }),

        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         warnings: false,
        //         output: {
        //             comments: false,
        //             beautify: false
        //         },
        //         mangle: {
        //             ie8: false
        //         },
        //         compress: {
        //             ie8: false,
        //             conditionals: true,
        //             unused: true,
        //             comparisons: true,
        //             sequences: true,
        //             dead_code: true,
        //             evaluate: true,
        //             if_return: true,
        //             join_vars: true,
        //             negate_iife: false
        //         }
        //     }
        // }),

        new ExtractTextPlugin('[name].css'),

        new webpack.NormalModuleReplacementPlugin(
            /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
            helper.root('config/empty.js')
        ),

        new AngularCompilerPlugin({
            tsConfigPath: helper.root('src/e2e-demo/tsconfig-build.json'),
            mainPath: helper.root('src/e2e-demo/main.ts'),
            sourceMap: true
        })
    ]
});
