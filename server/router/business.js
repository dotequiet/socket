const Router = require('koa-router')
const { err, succ } = require('../util/res')
const { initializeBoot } = require('../midddleware/upload')

let bus = new Router({
  prefix: '/'
})
bus.get('initialize', async (ctx) => {
  let body = ctx.request.query
  try {
    let data = await initializeBoot()
    console.log(data)
  } catch (e) {
    log.warming.error('initialize', e)
    log.warming.error('initialize', body)
    return ctx.body = err(400, e)
  }
})

module.exports = bus
