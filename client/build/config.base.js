import path from 'path'
import * as loaders from './loaders'
import * as plugins from './plugins'

export default (options) => {
  const {
    appName,
    chunkHash = '',
    sourceMap = true,
  } = options

  return {
    entry: {
      app: `./client/src/${appName}/main.js`,
      vendor: [
        'vue',
        'vuex',
        'vue-i18n',
        'vue-router',
        'vee-validate',
        'mqtt/dist/mqtt',
        'axios',
        'swiper',
        'validator',
        'babel-polyfill',
        'perfect-scrollbar'
      ]
    },
    output: {
      path: path.join(__dirname, `../dist/${appName}/`),
      publicPath: `/public/${appName}/`,
      filename: `javascripts/[name]${chunkHash}.js`
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        {
          test: /\.vue/,
          use: loaders.vueLoader(options)
        },
        {
          test: /\.js/,
          use: loaders.babelLoader(options)
        },
        {
          test: /\.css$/,
          use: loaders.cssLoader(options)
        },
        {
          test: /\.scss$/,
          use: loaders.scssLoader(options)
        },
        {
          test: /\.png$|\.jpg$|\.gif$/,
          use: loaders.imageLoader(options)
        },
        {
          test: /\.(woff2|woff|eot|svg|ttf)(\?v=\d+\.\d+\.\d+)?$/,
          use: loaders.fontLoader(options)
        }
      ]
    },
    plugins: [
      ...plugins.cleanPlugin(options),
      ...plugins.definePlugin(options),
      ...plugins.uglifyJsPlugin(options),
      ...plugins.extractTextPlugin(options),
      ...plugins.htmlWebpackPlugin(options),
      ...plugins.commonsChunkPlugin(options)
    ],
    devtool: sourceMap ? 'source-map' : undefined
  }
}