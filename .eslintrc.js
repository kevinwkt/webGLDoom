const fs = require('fs');
const path = require('path');
const babelrc = require('./babel.config');

const { plugins } = babelrc;
let babelModuleSettings = {};
const [babelModulePluginArray] = plugins.filter(
  (x) => Array.isArray(x) && x[0] == 'module-resolver',
);
if (babelModulePluginArray) {
  babelModuleSettings = babelModulePluginArray[1];
}

module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['no-mixed-operators'],
  globals: {
    __DEV__: true,
    __APP_NAME__: 'webGLDoom',
    __APP_VERSION__: '0.0.0',
  },
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-mixed-operators': 'off',
    'no-mixed-operators/no-mixed-operators': 'error',
    'import/no-extraneous-dependencies': (context) => [
      'error',
      {
        devDependencies: true,
        packageDir: [context.getFilename(), __dirname],
      },
    ],
  },
};
