const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appBuild: resolveApp('static'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('templates/index.html'),
  appIndexJs: resolveApp('src/index.jsx'),
  //appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  //yarnLockFile: resolveApp('yarn.lock'),
  //testsSetup: resolveApp('src/setupTests.js'),
  //appNodeModules: resolveApp('node_modules'),
  //ownNodeModules: resolveApp('node_modules'),
};
