import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default (options) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: options.minimize,
      sourceMap: options.sourceMap
    }
  };

  const scssLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  const resolveUrlLoader = {
    loader: 'resolve-url-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  if(options.extract) {
    return ExtractTextPlugin.extract({
      use: [cssLoader, resolveUrlLoader, scssLoader],
      fallback: 'vue-style-loader'
    });
  }

  return ['vue-style-loader', cssLoader, resolveUrlLoader, scssLoader];
}