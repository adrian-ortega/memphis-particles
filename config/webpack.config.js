const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const env = (process.env.NODE_ENV || 'production') === 'production' ? 'production' : 'development'
const environmentConfig = require(`./env/${env}`)

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, '../src/index.js'),
            path.resolve(__dirname, '../src/scss/app.scss')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/assets'),
        filename: 'scripts/[name].js'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            '@' : path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            url: false,
                            sourceMap: env !== 'production'
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: env !== 'production'
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            proxy: 'memphis-particles.local',
            ghostMode: false,
            files: []
        }, {
            injectCss: true
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css'
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.EnvironmentPlugin(environmentConfig),
        new webpack.SourceMapDevToolPlugin({
            filename: 'scripts/[name].js.map'
        }),
        new OptimizeCss({
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
        }),
    ]
}
