import { makePost, makeGet, apiurlaccount } from './_help.js'

const baseUri = '/api'
const versionUri = '/api/version'
const bookUri = '/api/book'

export const getUserApi = (params) => makeGet(apiurlaccount(`${baseUri}/getUser`), params)

export const logoutApi = (params) => makeGet(apiurlaccount(`${baseUri}/logout`), params)

export const systemListApi = (params) => makeGet(apiurlaccount(`${baseUri}/systemList`), params)

export const queryApi = (params) => makeGet(apiurlaccount(`${versionUri}/query`), params)

export const deleteApi = (params) => makePost(apiurlaccount(`${versionUri}/delete`), params)

export const saveApi = (params) => makePost(apiurlaccount(`${versionUri}/save`), params)

export const publishVersionApi = (params) => makePost(apiurlaccount(`${versionUri}/publish`), params)

export const updateDataApi = (params) => makePost(apiurlaccount(`${versionUri}/updateData`), params)
