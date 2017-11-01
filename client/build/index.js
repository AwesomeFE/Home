import '../../config';
import webpack from 'webpack';
import webpackDevConfig from './config.development';
import webpackStagingConfig from './config.staging';
import webpackProductionConfig from './config.production';

let compiler = {};

switch (process.env.NODE_ENV) {
  case 'development': {
    compiler = webpack(webpackDevConfig);
    compiler.watch({aggregateTimeout: 300, poll: true}, resultHandler);
    break;
  }
  case 'staging': {
    compiler = webpack(webpackStagingConfig);
    compiler.run(resultHandler);
    break;
  }
  case 'production': {
    compiler = webpack(webpackProductionConfig);
    compiler.run(resultHandler);
    break;
  }
}

function resultHandler(err, stats) {
  if (err) throw err;

  for(let stat of stats.stats) {
    process.stdout.write(stat.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n');
  }
}