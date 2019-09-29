import translations from './translations';

export default ctx => {
  const {language} = ctx.params;
  ctx.body = translations[language.toLocaleString()] || translations['pt_br'];
  ctx.status = 200;
};
