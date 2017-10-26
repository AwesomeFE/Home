import webpackTask from './config.base'

export default [
  webpackTask({
    appName: 'client',
    chunkHash: '.[chunkhash]',
    extract: true,
    minimize: true,
    sourceMap: false
  }),
  webpackTask({
    appName: 'mobile',
    chunkHash: '.[chunkhash]',
    extract: true,
    minimize: true,
    sourceMap: false
  })
  // webpackTask({
  //   appName: 'admin',
  //   chunkHash: '.[chunkhash]',
  //   extract: true,
  //   minimize: true,
  //   sourceMap: false
  // })
]
