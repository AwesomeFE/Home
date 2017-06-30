import webpackTask from './config.base'

module.exports = [
  webpackTask({
    appName: 'client',
    chunkHash: '.[chunkhash]',
    extract: false,
    minimize: false,
    sourceMap: true
  })
]
