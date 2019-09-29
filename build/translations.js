"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _lodash = require('lodash');
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _glob = require('glob'); var _glob2 = _interopRequireDefault(_glob);

const folder = _path2.default.resolve(__dirname, '../', 'resources');

if (!folder) {
  console.error(folder, 'doesnt exists');
  process.exit(1);
}

exports. default = _glob2.default.sync(folder + '/**/*.json', null)
  .reduce((files, filePath, index, array) => {
    const fileContent = require(filePath);
    const parts = filePath.replace(folder, '').replace('.json', '').split('/').filter(Boolean);
    const language = parts[0];

    const [localeGroup] = language.split('_');

    const localeExists = array.find(file => file.replace(folder, '').match(new RegExp(`^${localeGroup}\\/`)));

    return [
      ...files,
      {
        fileContent,
        language
      },
      language.includes('_') && !localeExists ? {
        fileContent,
        language: localeGroup
      } : null,
    ].filter(Boolean);

  }, [])
  .reduce((translations, fileInfo) => {
    const {fileContent, language} = fileInfo;

    return {
      ...translations,
      [language]: _lodash.merge.call(void 0, {...translations[language]}, fileContent)
    };
  }, {});
