import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default (options) => {
  let {
    extract,
    chunkHash
  } = options

  let plugin = []

  if(extract) {
    plugin.push(new ExtractTextPlugin(`stylesheets/app${options.chunkHash}.css`))
  }

  return plugin
}