import fs from 'fs';
import path from 'path';
import util from 'util';

const readFile = path => util.promisify(fs.readFile)(path, {encoding: 'utf-8'});
const fileExists = filePath => new Promise((resolve, reject) => {
  fs.access(filePath, fs.F_OK, err => {
    if (err) {
      console.error(err);
      return reject(false);
    }

    resolve(true);
  });
});

const translationsPath = path.resolve(__dirname, 'resources/i18n');

const defaultLanguagePath = path.resolve(translationsPath, 'pt_BR.json');

export default async ctx => {
  const {language} = ctx.params;
  const filePath = path.resolve(translationsPath, `${language.toLowerCase()}.json`);

  try {
    await fileExists(filePath);

    ctx.body = await readFile(filePath);
  } catch(e) {
    ctx.body = await readFile(defaultLanguagePath);

  }

  ctx.status = 200;
};
