import webpack from 'webpack'

export default () => [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.SERVER_HOST': JSON.stringify(process.env.SERVER_HOST),
    'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
  })
]