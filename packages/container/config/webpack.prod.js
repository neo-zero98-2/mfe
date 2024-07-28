const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //asegurarnos de obtener un archivo html
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js', // opcion que cambia el nombrado de los archivos que se compilan
        publicPath: '/container/latest/' // antepone la ruta /container/latest/ a filename quedando /container/latest/[name].[contenthash].js
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);