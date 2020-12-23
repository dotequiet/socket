const Router = require('koa-router')
const fs = require('fs')
const moment = require('moment')
const { getUser, logout } = require('../midddleware/login')
const { fileUpload } = require('../midddleware/upload')
const { systemList } = require('../config')
const { err, succ } = require('../util/res')
const { createGuid } = require('../util/lib')
const type = 'mtpproject'

let api = new Router({
  prefix: '/'
})

api.get('logout', async (ctx) => {
  try {
    let data = await logout(ctx.cookies.get('version_key'), ctx.request.url)
    ctx.status = 302
    ctx.redirect(JSON.parse(data).result)
  } catch (e) {
    log.warming.error('getUser', [e, ctx.query])
    return ctx.body = err(400, e)
  }
})
api.get('getUser', async (ctx) => {
  try {
    let data = await getUser(ctx.cookies.get('version_key'), ctx.request.url)
    data = JSON.parse(data)
    if (data.ec === 200) {
      return ctx.body = succ(data.result)
    } else if (data.ec === 401) {
      ctx.status = 302
      ctx.redirect(data.result)
    } else {
      return ctx.body = err(400, data.result)
    }
  } catch (e) {
    log.warming.error('getUser', [e, ctx.query])
    return ctx.body = err(400, e)
  }
})
api.get('systemList', async (ctx) => {
  return ctx.body = succ(systemList)
})
api.post('upload', async (ctx) => {
  const file = ctx.request.files.image
  const reader = fs.createReadStream(file.path)
  let guid = createGuid()
  let suffix = file.path.split('.')[file.path.split('.').length - 1] // 文件后缀
  let url = `uri=/${type}/${guid.substr(0,2)}/${guid.substr(2,2)}/${guid}${moment(new Date()).format('YYYYMMDD')}.${suffix}`
  try {
    let data = await fileUpload(url, guid, {
      filename: reader
    }, type)
    let params = Object.assign({
      result: `/private_file/${type}/${guid.substr(0,2)}/${guid.substr(2,2)}/${guid}${moment(new Date()).format('YYYYMMDD')}.${suffix}`
    }, JSON.parse(data))
    if (JSON.parse(data).ec === 200) {
      return ctx.body = params
    } else {
      return ctx.body = err(400, JSON.parse(data).em)
    }
  } catch (e) {
    return ctx.body = err(400, e.message)
  }
})

module.exports = api
