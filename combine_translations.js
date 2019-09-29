const translations = require('./build/translations').default;
const path = require('path');
const fs = require('fs');
const args = process.argv.slice(2);
const MISSING_OUTPUT_FOLDER_ERROR = 'missing output folder';

if (!args.includes('-d')) {
  console.error(MISSING_OUTPUT_FOLDER_ERROR);
  process.exit(1);
}

const outputFolder = args[args.indexOf('-d') + 1];

if (!outputFolder) {
  console.log(MISSING_OUTPUT_FOLDER_ERROR);
  process.exit(1);
}

for (let language in translations) {
  // eslint-disable-next-line no-prototype-builtins
  if (translations.hasOwnProperty(language)) {
    fs.writeFile(path.resolve(__dirname, outputFolder, `${language}.json`),
      JSON.stringify(translations[language], null, 4),
      {
        flag: 'a+'
      },
      err => {
        if (err) {
          return console.log(err);
        }

        console.log(language, 'created!');
      });
  }
}
