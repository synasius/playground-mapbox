const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const paths = require("../config/paths.js");

const config = require("../config/webpack.config.js");
const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  // Can also be an array, or: contentBase: "http://localhost/",
  contentBase: paths.appPublic,

  // It is important to tell WebpackDevServer to use the same "root" path
  // as we specified in the config. In development, we always serve from /.
  publicPath: config.output.publicPath,

  // Enable special support for Hot Module Replacement
  hot: true,

  // Set this if you want to enable gzip compression for assets
  compress: true,

  // Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.
  clientLogLevel: "warning",

  quiet: false,
  stats: { colors: true },
});
server.listen(8080);
