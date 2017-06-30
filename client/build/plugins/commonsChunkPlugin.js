import webpack from 'webpack'

export default () => [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
  })
]