import HtmlWebpackPlugin from 'html-webpack-plugin'

export default () => [
  new HtmlWebpackPlugin({
    chunks: ['app', 'vendor', 'manifest'],
    template: './client/index.html',
    filename: `./index.html`,
    inject: true
  })
]