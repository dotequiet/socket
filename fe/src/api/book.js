import { makePost, makeGet, apiurlaccount } from './_help.js'

const bookUri = '/api/book'

export const createPidApi = (params) => makePost(apiurlaccount(`${bookUri}/createPid`), params)

export const updatePageInfoApi = (params) => makePost(apiurlaccount(`${bookUri}/updatePageInfo`), params)

export const deletePageApi = (params) => makePost(apiurlaccount(`${bookUri}/deletePage`), params)

export const menuListApi = (params) => makeGet(apiurlaccount(`${bookUri}/menuList`), params)

export const getBookDetailByIdApi = (params) => makeGet(apiurlaccount(`${bookUri}/getBookDetailById`), params)

export const getChildrenListApi = (params) => makeGet(apiurlaccount(`${bookUri}/getChildrenList`), params)
