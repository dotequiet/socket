const Router = require('koa-router')
const { err, succ } = require('../util/res')
const { getUser } = require('../midddleware/login')
const { createPid, queryById, queryData, updatePageInfo, deletePage, getChildrenList } = require('../controller/book')

let book = new Router({
  prefix: '/'
})
const userInfo = async (cookies, url = '/') => {
  try {
    let data = await getUser(cookies, url)
    return data
  } catch (e) {
    return err(400, e.message)
  }
}

book.post('createPid', async (ctx) => {
  let authorInfo = await userInfo(ctx.cookies.get('version_key'), ctx.request.url)
  authorInfo = JSON.parse(authorInfo)
  if (authorInfo.ec !== 200) return ctx.body = err(400, authorInfo.em)
  let postData = ctx.request.body
  let date = +new Date()
  let params = Object.assign(postData, {
    author: authorInfo.result.name,
    updateTime: date,
    createTime: date,
  })
  try {
    let data = await createPid(params)
    data  = JSON.parse(data)
    if (data.result.protocol41) {
      let result = await queryById(data.result.insertId)
      return ctx.body = result
    } else {
      return ctx.body = err(400, 'error')
    }
  } catch (e) {
    log.warming.error('createPid', e)
    log.warming.error('createPid', ctx.request.body)
    return ctx.body = err(400, e)
  }
})

book.post('updatePageInfo', async (ctx) => {
  let params = ctx.request.body
  try {
    let authorInfo = await userInfo(ctx.cookies.get('version_key'), ctx.request.url)
    authorInfo = JSON.parse(authorInfo)
    if (authorInfo.ec !== 200) return ctx.body = err(400, authorInfo.em)
    let data = await updatePageInfo(params.title, params.bookDesc, params.body, +new Date(), authorInfo.result.name, params.id)
    return ctx.body = data
  } catch (e) {
    log.warming.error('updatePageInfo', e)
    log.warming.error('updatePageInfo', ctx.request.body)
    return ctx.body = err(400, e)
  }
})
book.post('deletePage', async (ctx) => {
  let params = ctx.request.body
  try {
    let data = await deletePage(params.id, params.pid)
    if (data[0].protocol41 && data[1].protocol41) {
      return ctx.body = succ('ok')
    }
  } catch (e) {
    log.warming.error('deletePage', e)
    log.warming.error('deletePage', ctx.request.body)
    return ctx.body = err(400, e)
  }
})
book.get('menuList', async (ctx) => {
  try {
    let data = await queryData(ctx.query.system)
    return ctx.body = data
  } catch (e) {
    log.warming.error('menuList', e)
    log.warming.error('menuList', ctx.request.body)
    return ctx.body = err(400, e)
  }
})

book.get('getBookDetailById', async (ctx) => {
  let { id } = ctx.query
  try {
    let data = await queryById(id, true)
    return ctx.body = data
  } catch (e) {
    log.warming.error('getBookDetailById', e)
    log.warming.error('getBookDetailById', ctx.request.body)
    return ctx.body = err(400, e)
  }
})
book.get('getChildrenList', async (ctx) => {
  let { pid } = ctx.query
  try {
    let data = await getChildrenList(pid, true)
    return ctx.body = data
  } catch (e) {
    log.warming.error('getChildrenList', e)
    log.warming.error('getChildrenList', ctx.request.body)
    return ctx.body = err(400, e)
  }
})

module.exports = book
