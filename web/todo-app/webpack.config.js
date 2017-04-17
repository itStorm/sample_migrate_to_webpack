'use strict';

const webpack = require('webpack');
const path = require('path');

const dev = 'dev';
const prod = 'prod';
const NODE_ENV = (process.env.NODE_ENV) || dev;

let config = {
    context: path.resolve(__dirname, "frontend"),
    entry: {
        home: "home",
        view: "view"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, "frontend"),
            "node_modules"
        ],
        extensions: [".js", ".json"]
    },
    resolveLoader: {
        modules: ["node_modules"],
        extensions: [".js", ".json"],
        mainFields: ["loader", "main"]
    },
    module: {
        rules: [
            {
                test: /db\/index\.js$/,
                use: [
                    {
                        loader: 'expose-loader',
                        options: 'db'
                    },
                    {
                        loader: 'exports-loader',
                        options: 'db'
                    }
                ]
            },
            {
                test: /jquery\/index\.js$/,
                use: [
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            }
        ]
    },

    devtool: NODE_ENV == dev ? 'cheap-inline-module-source-map' : 'source-map',
    watch: NODE_ENV == dev
};

module.exports = config;