import axios from 'axios'

axios.create({
  timeout: 30000,
  withCredentials: true
})
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.interceptors.response.use((response) => {
  if (!response.data || (response.data.ec !== 200 && response.data.ec !== 0)) {
    if (response.data.ec === 699) {
      return Promise.resolve(response.data)
    }
    return Promise.reject(response.data.em || '请求失败')
  }
  if (typeof response.data.result === 'string' && response.data.ec !== 200) {
    try {
      return JSON.parse(response.data.result)
    } catch (e) {
      return response.data
    }
  }
  return response.data
})
export const get = (...args) => {
  return axios.get.apply(axios, args)
}

export const put = (...args) => {
  return axios.put.apply(axios, args)
}

export const post = (...args) => {
  return axios.post.apply(axios, args)
}

export const postJson = (...args) => {
  // axios.interceptors.request.use((config) => {
  //   config.headers['Content-Type'] = 'application/json'
  //   return config
  // })
  return axios.post.apply(axios, [
    ...args,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ])
}

export const throws = (e) => {
  throw e
}
export const makeGet = (url, opts = {}) => {
  let params = JSON.parse(JSON.stringify(opts))
  if (!params.t) {
    params.t = `${new Date().getTime()}`
  }
  return get(`${url}`, { params })
}

/* eslint-disable */
export const makePut = (url, opts = {}) => {
  return put(`${url}`, opts)
}
export const makePost = (url, opts = {}) => {
  return postJson(`${url}`, opts)
}

export const makePostJson = (url, opts = {}) => {
  return postJson(`${url}`, opts)
}

export const apiurlaccount = (url) => {
  return `${url}`
}
