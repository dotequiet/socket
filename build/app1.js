const http = require('http');
const Koa = require('koa');
const router = require('koa-router')()
const send = require('koa-send')
const path = require('path')
const static = require('koa-static')
const app = new Koa();
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../public'

app.use(static(path.join( __dirname,  staticPath), { extensions: ['html']}))
router.get('*',async (ctx, next) => {
  console.log(ctx.request.url)
  try{
    if (ctx.request.url !== '/favicon.ico') {
      console.log(ctx.request.url)
      // console.log(path.resolve(__dirname , '../view/config'))
      await send(ctx, 'index.html', { root: path.resolve(__dirname , '../view/config') });
    }
  }catch (error) {
    console.log(error);
    // return ctx.body = resHelper.err(403, `请求失败:${error.message}`);
  }
})
app.use(router.routes())
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

http.createServer(app.callback()).listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})
