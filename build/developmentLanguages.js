"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _translations = require('./translations'); var _translations2 = _interopRequireDefault(_translations);

exports. default = ctx => {
  console.log(process.env.NODE_ENV);

  const {language} = ctx.params;
  ctx.body = _translations2.default[language] || _translations2.default['pt_BR'];
  ctx.status = 200;
};
