const Router = require('koa-router')
const { selectAllData, insertData, deleteVersion, updateData,
  publishVersion, selectDataById, selectByCondition } = require('../controller/version/operatedb')
const { err, succ } = require('../util/res')

let version = new Router({
  prefix: '/'
})
version.get('query', async (ctx) => {
  try {
    let data = await selectAllData(ctx.query.system, ctx.query.isEffect && ctx.query.isEffect !== 'false')
    return ctx.body = succ(data.map(item => {
      item.dataInfo = JSON.parse(item.dataInfo)
      return item
    }))
  } catch (e) {
    log.warming.error('query', [e, ctx.query])
    return ctx.body = err(400, e)
  }
})
version.get('queryById', async (ctx) => {
  try {
    let data = await selectDataById(ctx.query.id)
    return ctx.body = succ(data.map(item => {
      item.dataInfo = JSON.parse(item.dataInfo)
      return item
    }))
  } catch (e) {
    log.warming.error('query', [e, ctx.query])
    return ctx.body = err(400, e)
  }
})
version.post('save', async (ctx) => {
  let postData = ctx.request.body
  try {
    let isEffectVersion = await selectByCondition(`version="${postData.version}" AND system="${postData.system}"`, )
    if (isEffectVersion.length) {
      return ctx.body = err(400, `${postData.version}版本已存在,不能重复添加`)
    }
    let data = await insertData(postData)
    log.http.info('selectAllData', data)
    log.http.info('selectAllData', postData)
    return ctx.body = succ(data.protocol41)
  } catch (e) {
    log.warming.error('save', e)
    log.warming.error('save', postData)
    return ctx.body = err(400, e)
  }
})
version.post('delete', async (ctx) => {
  try {
    let postData = ctx.request.body
    if (!postData.id) {
      return ctx.body = err(400, '参数id不能为空')
    }
    let data = await deleteVersion(postData.id)
    log.http.info('deleteVersion', data)
    return ctx.body = succ(data.protocol41)
  } catch (e) {
    log.warming.error('deleteVersion', e)
    log.warming.error('deleteVersion', ctx.request.body)
    return ctx.body = err(400, e)
  }
})
version.post('publish', async (ctx) => {
  try {
    let postData = ctx.request.body
    if (!postData.id) {
      return ctx.body = err(400, '参数id不能为空')
    }
    let data = await publishVersion(postData.id)
    log.http.info('publishVersion', data)
    return ctx.body = succ(data.protocol41)
  } catch (e) {
    log.warming.error('publishVersion', ctx.request.body)
    log.warming.error('publishVersion', e)
    return ctx.body = err(400, e)
  }
})
version.post('updateData', async (ctx) => {
  try {
    let postData = ctx.request.body
    if (!postData.id) {
      return ctx.body = err(400, '参数id不能为空')
    }
    if (!postData.version) {
      return ctx.body = err(400, '系统版本不能为空')
    }
    let data = await updateData(postData.id, postData.updateTime, postData.dataInfo)
    log.http.info('updateData', data)
    return ctx.body = succ(data.protocol41)
  } catch (e) {
    log.warming.error('updateData', ctx.request.body)
    log.warming.error('updateData', e)
    return ctx.body = err(400, e)
  }
})
module.exports = version
