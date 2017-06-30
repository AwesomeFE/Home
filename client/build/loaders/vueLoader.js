import cssLoader from './cssLoader'
import scssLoader from './scssLoader'

export default (options) => {
  return {
    loader: 'vue-loader',
    options: {
      loaders: {
        css: cssLoader(options),
        scss: scssLoader(options)
      }
    }
  }
}