import webpack from 'webpack'

export default (options) => {
  let {
    sourceMap,
    minimize
  } = options

  let plugin = []

  if(minimize) {
    plugin.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap,
      compress: {
        warnings: sourceMap
      }
    }))
  }

  return plugin
}