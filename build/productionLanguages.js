"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _util = require('util'); var _util2 = _interopRequireDefault(_util);

const readFile = path => _util2.default.promisify(_fs2.default.readFile)(path, {encoding: 'utf-8'});
const fileExists = filePath => new Promise((resolve, reject) => {
  _fs2.default.access(filePath, _fs2.default.F_OK, err => {
    if (err) {
      console.error(err);
      return reject(false);
    }

    resolve(true);
  });
});

const translationsPath = _path2.default.resolve(__dirname, 'resources/i18n');

const defaultLanguagePath = _path2.default.resolve(translationsPath, 'pt_BR.json');

exports. default = async ctx => {
  const {language} = ctx.params;
  const filePath = _path2.default.resolve(translationsPath, `${language}.json`);

  try {
    await fileExists(filePath);

    ctx.body = await readFile(filePath);
  } catch(e) {
    ctx.body = await readFile(defaultLanguagePath);

  }

  ctx.status = 200;
};
