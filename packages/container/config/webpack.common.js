const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Esste archivo son las configuraciones comunes que comparte el webvpack
 * es decir esta configuración siempre estara en dev y prod o cualquier otro planeta
 */
module.exports = {
    module: {
        // El objetivo de un loader, es decirle 
        // a Webpack que procese algunos archivos
        // diferentes a medida que comenzamos 
        // a importarlos a nuestro proyecto.
        // pueden ser archivos, imagenes, fuentes, etc.

        rules: [ 
            {
                    // cada vez que importamos en un archivo
                    // que termina con una extensión de cualquiera
                    // de mjs o simplemente js, queremos que sea procesado
                    // por babel
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                } 
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}