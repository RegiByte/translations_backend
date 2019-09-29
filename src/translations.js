import {merge} from 'lodash';
import path from 'path';
import glob from 'glob';

const folder = path.resolve(__dirname, '../', 'resources');

if (!folder) {
  console.error(folder, 'doesnt exists');
  process.exit(1);
}

export default glob.sync(folder + '/**/*.json', null)
  .reduce((files, filePath, index, array) => {
    const fileContent = require(filePath);
    const parts = filePath.replace(folder, '').replace('.json', '').split('/').filter(Boolean);
    const language = parts[0].toLowerCase();

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
      [language]: merge({...translations[language]}, fileContent)
    };
  }, {});
