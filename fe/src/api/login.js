import formurlencoded from 'form-urlencoded'
import { post, apiurlaccount } from './_help.js'

const baseUri = '/apirest/session'
const addParams = (data = {}) => {
  return formurlencoded(data)
}

export const userApi = (params) => post(apiurlaccount(`${baseUri}/user`), addParams(params))
// 用户查询
export const searchMember = (params) => post(apiurlaccount(`${baseUri}/searchUserName`), addParams(params))
// 获取所有环境
export const getAllEnvApi = (params) => post(apiurlaccount('/apirest/env/getAll'), addParams(params))
// 获取当前环境
export const currentEnvApi = (params) => post(apiurlaccount('/apirest/env/current'), addParams(params))
// 保存选择环境
export const saveRegionEnvApi = (params) => post(apiurlaccount('/apirest/env/saveRegion'), addParams(params))
