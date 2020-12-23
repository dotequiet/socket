const ajax = require('axios')
const { err, succ } = require('../util/res')
const { aegsieConfig } = require('../config')

log.http.info('aegsieConfig', aegsieConfig)
const login = async (ctx, next) => {
  if (!ctx.cookies.get('version_key')) {
    ctx.status = 302
    ctx.redirect(`${aegsieConfig.login}/sso/login/${aegsieConfig.key}?redirect_url=${ctx.request.url}`)
    await next()
  } else {
    try {
      let data = await ajax.post(`${aegsieConfig.login1}/sso/check`, {
        key: aegsieConfig.key,
        secret: aegsieConfig.secret,
        token: ctx.cookies.get('version_key'),
      })
      if (data.data.ec === 404) {
        ctx.redirect(`${aegsieConfig.login}/sso/login/${aegsieConfig.key}?redirect_url=${ctx.request.url}`)
      } else if (data.data.ec === 400) {
        return ctx.body = err(400, '用户状态异常')
      }
      await next()
    } catch (error) {
      console.log('tag', error)
      if (error.data.ec === 404) {
        ctx.status = 302
        ctx.redirect(`${aegsieConfig.login}/sso/login/${aegsieConfig.key}?redirect_url=${ctx.request.url}`)
      } else if (error.data.ec === 400) {
        return ctx.body = err(400, '用户状态异常')
      }
      await next()
    }
  }
}

const getUser = async (cookies, url = '/') => {
  if (!cookies) {
    return err(401, `${aegsieConfig.login}/sso/login/${aegsieConfig.key}?redirect_url=${url}`)
  } else {
    try {
      let data = await ajax.post(`${aegsieConfig.login1}/sso/check`, {
        key: aegsieConfig.key,
        secret: aegsieConfig.secret,
        token: cookies
      })
      if (data.data.ec === 404) {
        return err(401, `${aegsieConfig.login}/sso/login/${aegsieConfig.key}?redirect_url=${url}`)
      } else if (data.data.ec === 400) {
        return err(400, '用户状态异常')
      } else {
        return succ(data.data.user)
      }
    } catch (error) {
      if (error.data.ec === 404) {
        return err(401, `${aegsieConfig.login}/sso/login/${aegsieConfig.key}?redirect_url=${url}`)
      } else if (error.data.ec === 400) {
        return err(400, '用户状态异常')
      }
    }
  }
}

const logout = async (token, url = '/') => {
  try {
    await ajax.get(`${aegsieConfig.login}/sso/logout/${aegsieConfig.key}?token=${token}`)
    return succ(`${aegsieConfig.login}/sso/login/${aegsieConfig.key}?redirect_url=${url}`)
  } catch (e) {
    return err(400, '用户状态异常')
  }
}

module.exports = {
  login,
  getUser,
  logout
}


