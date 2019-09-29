"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _koa = require('koa'); var _koa2 = _interopRequireDefault(_koa);
var _koarouter = require('koa-router'); var _koarouter2 = _interopRequireDefault(_koarouter);

const app = new (0, _koa2.default)();

const languagesHandler = process.env.NODE_ENV === 'production' ? require('./productionLanguages').default : require('./developmentLanguages').default;

const router = new (0, _koarouter2.default)()
  .get('/translations/:language', languagesHandler)
  .get('*', ctx => {
    ctx.body = `route "${ctx.path}" not found`;
    ctx.status = 404;
  });

app.use(router.routes());

app.listen(3000, () => {
  console.log('running on port 3000');
});
