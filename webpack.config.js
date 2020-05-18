import VueLoaderPlugin from 'vue-loader/lib/plugin'
import HtmlPlugin from 'html-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { DefinePlugin } from 'webpack'
import { resolve } from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const filename = isProduction
  ? '[name].[chunkhash].js'
  : '[name].[hash].js'

export default {
  entry: {
    polyfills: [
      'core-js/stable',
      'regenerator-runtime/runtime',
    ],
    main: resolve('./src/main.js')
  },
  output: {
    path: resolve('dist'),
    filename,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the package name from the module path
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

            // normalise the package name (some servers dont like @)
            return `npm.${packageName.replace('@', '')}`
          },
        },
      },
    },
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ],
    alias: {
      '@app': resolve(__dirname, 'src'),
      '@common': resolve(__dirname, 'src/common'),
      '@authentication': resolve(__dirname, 'src/common/authentication'),
      '@core': resolve(__dirname, 'src/common/core'),
      '@dashboard': resolve(__dirname, 'src/dashboard')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['@vue/babel-preset-app', { modules: false }]
              ],
              plugins: [
                '@babel/plugin-proposal-private-methods'
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, 
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: './src/index.html'
    }),
    new MiniCSSExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './assets/icons' },
        { from: './manifest.json' },
        { from: './browserconfig.xml' }
      ]
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'vue-csv',
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: 'http://localhost:8080/index.html',
      staticFileGlobs: [
        './assets/icons/**'
      ],
      stripPrefix: './assets/icons/',
      mergeStaticsConfig: true
    }),
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.PRODUCTION': isProduction
    })
  ]
}
