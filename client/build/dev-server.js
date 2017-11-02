import opn from 'opn';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleWare from 'webpack-dev-middleware';
import hotMiddleWare from 'webpack-hot-middleware';

class DevServer {
  constructor(webpackConfig) {
    this.webpackConfig = webpackConfig;
    this.host = process.env.SERVER_HOST;
    this.port = Math.ceil(Math.random() * 2000) + 3001;

    this.initDevServer();
    this.useDevMiddleware();
    // this.useHotMiddleware();
    // this.useStaticSource();
    this.setListeningCallback();
    this.runServer();
  }

  initDevServer() {
    this.app = express();
    this.compiler = webpack(this.webpackConfig);
  }

  useDevMiddleware() {
    this.devMiddleware = devMiddleWare(this.compiler, {
      publicPath: this.webpackConfig.output.publicPath,
      quiet: true
    });

    this.app.use(this.devMiddleware);
  }

  useHotMiddleware() {
    this.hotMiddleware = hotMiddleWare(this.compiler, { log: new Function() });

    this.enableForceReload();

    this.app.use(this.hotMiddleware);
  }

  useStaticSource() {
  }

  setListeningCallback() {
    const url = `http://localhost:${this.port}`;

    this.devMiddleware.waitUntilValid(() => {
      console.log(`> Listening at ${url}`);
      opn(url);
    });
  }

  runServer() {
    this.app.listen(this.port);
  }

  enableForceReload() {
    this.compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        this.hotMiddleware.publish({ action: 'reload' });
        cb();
      });
    });
  }
}

function createDevServers(webpackDevConfigs) {
  return webpackDevConfigs.map(webpackDevConfig => new DevServer(webpackDevConfig));
}

export default createDevServers;