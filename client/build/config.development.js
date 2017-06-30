import webpackTask from './config.base'

export default [
  webpackTask({
    appName: 'client',
    chunkHash: '',
    extract: false,
    minimize: false,
    sourceMap: true
  })
]