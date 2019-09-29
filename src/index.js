import Koa from 'koa';
import KoaRouter from 'koa-router';

const app = new Koa();

const languagesHandler = process.env.NODE_ENV === 'production' ? require('./productionLanguages').default : require('./developmentLanguages').default;

const router = new KoaRouter()
  .get('/translations/:language', languagesHandler)
  .get('*', ctx => {
    ctx.body = `route "${ctx.path}" not found`;
    ctx.status = 404;
  });

app.use(router.routes());

app.listen(3000, () => {
  console.log('running on port 3000');
});
