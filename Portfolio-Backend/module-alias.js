
// module-alias.js
const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAliases({
  '@controller': path.resolve(__dirname, 'src/controller'),
  '@middlewares': path.resolve(__dirname, 'src/middlewares'),
  '@validators': path.resolve(__dirname, 'src/validators'),
  '@models': path.resolve(__dirname, 'src/models'),
  '@routes': path.resolve(__dirname, 'src/routes'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@test': path.resolve(__dirname, 'src/test'),
  '@db': path.resolve(__dirname, 'src/db'),
  '@queries': path.resolve(__dirname, 'src/queries'),
  '@handlers': path.resolve(__dirname, 'src/handlers'),
});