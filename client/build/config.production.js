import webpackTask from './config.base'

module.exports = [
  webpackTask({
    appName: 'client',
    chunkHash: '.[chunkhash]',
    extract: true,
    minimize: true,
    sourceMap: false
  }),
  // webpackTask({
  //   appName: 'admin',
  //   chunkHash: '.[chunkhash]',
  //   extract: true,
  //   minimize: true,
  //   sourceMap: false
  // })
]
