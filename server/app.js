const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const { succ, err } = require('./util/res')
// const bodyParser = require('koa-bodyparser')
const fs = require('fs')

const { log } = require('./log/index.js')
const { SocketIo } = require('./controller/socketlogs')
global.log = log
const app = new Koa()
const server = require('http').createServer(app.callback())
const path = require('path')
const api = require('./router/api')
const book = require('./router/book')
const version = require('./router/version')
const bus = require('./router/business')
const { login } = require('./midddleware/login')
const io = new SocketIo(server, {})

let promiseIo = (postData, id) => {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      log.error.fatal('timer', 'error')
      reject(err(400, 'timeout'))
    }, 5000)
    io.sendSocketMsg('clientMsg', postData, id, (data) => {
      log.http.info('meshHotUpdate', data)
      log.http.info('meshHotUpdate', id)
      clearTimeout(timer)
      if (data) {
        resolve(succ(200, data))
      } else {
        log.error.fatal('data', 'error')
        reject(err(400, '服务异常'))
      }
    })
  })
}
app.use(koaBody({
  multipart: true, // 支持文件上传
  // encoding: 'gzip',
  formidable: {
    // uploadDir: path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    // maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}))
// 配置ctx.body解析中间件
// app.use(bodyParser())

let html = new Router()
/**
 * 静态资源
 *  */
const staticPath = '../public'
app.use(koaStatic(
  path.join( __dirname, staticPath)
))
/**
 * router
 */

html.post('meshHotUpdate', async (ctx) => {
  let postData = ctx.request.body
  log.http.info('meshHotUpdate', postData, ctx.request.header)
  if (!ctx.request.header.socketid) {
    return ctx.body = err(400, `socketid is ${ctx.request.header.socketid}`)
  }
  try {
    let data  = await promiseIo(postData, ctx.request.header.socketid)
    log.http.info('meshHotUpdate', 'success')
    return ctx.body = data
  } catch (error) {
    log.error.fatal('meshHotUpdate', error)
    return ctx.body = error
  }
})
html.get('meshHotUpdate', async (ctx) => {
  let postData = ctx.request.query
  log.http.info('meshHotUpdate', postData)
  try {
    let data  = await promiseIo(postData)
    return ctx.body = data
  } catch (error) {
    return ctx.body = error
  }
})
html.get('loginCallback', async (ctx) => {
  const { token, userid, redirect_url } = ctx.query;
  ctx.cookies.set(
    'version_key',
    token,
    {
      domain: '', // 写cookie所在的域名
      path: '/', // 写cookie所在的路径
      maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
      httpOnly: true, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    }
  )
  ctx.cookies.set(
    'userid',
    userid,
    {
      domain: '', // 写cookie所在的域名
      path: '/', // 写cookie所在的路径
      maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
      httpOnly: true, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    }
  )
  ctx.redirect(redirect_url || '/')
})
html.get('boot/:path?/:id?', login, async (ctx) => {
  ctx.response.type = 'html'
  ctx.body = fs.createReadStream(path.join(__dirname, '../view/boot/index.html'))
})
html.get('logs/:path?/:id?', login, async (ctx) => {
  ctx.response.type = 'html'
  ctx.body = fs.createReadStream(path.join(__dirname, '../view/logs/index.html'))
})
html.get('/', login, async (ctx) => {
  ctx.response.type = 'html'
  ctx.body = fs.createReadStream(path.join(__dirname, '../view/config/index.html'))
})

let Route = new Router()
// api
Route.use('/api/version', login, version.routes(), version.allowedMethods())
Route.use('/api/book', login, book.routes(), book.allowedMethods())
Route.use('/api/bus', login, bus.routes(), bus.allowedMethods())
Route.use('/api', login, api.routes(), api.allowedMethods())

Route.use('/', html.routes(), html.allowedMethods())
app.use(Route.routes()).use(Route.allowedMethods())
app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.status) {
      ctx.response.type = 'html'
      ctx.body = fs.createReadStream(path.join(__dirname, '../view/config/index.html'))
    }
  } catch (error) {
    console.log(error)
  }
})
app.on('error', (err, ctx) =>{
  log.warming.error('appError', err)
})

server.listen(3000, () => {
  console.log(`listening on: 3000 with ${app.env}`)
})

server.timeout = 60 * 1000

