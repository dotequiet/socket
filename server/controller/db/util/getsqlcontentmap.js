const fs = require('fs')

/**
 * 遍历目录下的文件目录
 * @param  {string} pathResolve  需进行遍历的目录路径
 * @param  {string} mime         遍历文件的后缀名
 * @return {object}              返回遍历后的目录结果
 */
const walkFile = (pathResolve, mime) => {
  let files = fs.readdirSync(pathResolve)
  let fileList = {}
  files.forEach(item => {
    let itemArr = item.split('\.')
    let itemMime = ( itemArr.length > 1 ) ? itemArr[ itemArr.length - 1 ] : 'undefined'
    if( mime === itemMime ) {
      fileList[ item ] =  pathResolve + item
    }
  })
  return fileList
}

/**
 * 获取sql目录下的文件目录数据
 * @return {object}
 */
const getSqlMap = () => {
  let basePath = __dirname
  basePath = basePath.replace(/\\/g, '\/')
  let pathArr = basePath.split('\/')
  pathArr = pathArr.splice( 0, pathArr.length - 1 )
  basePath = pathArr.join('/') + '/sql/'
  let fileList = walkFile( basePath, 'sql' )
  return fileList
}

let sqlContentMap = {}
/**
 * 读取sql文件内容
 * @param  {string} fileName 文件名称
 * @param  {string} path     文件所在的路径
 * @return {string}          脚本文件内容
 */
const getSqlContent = ( fileName,  path ) => {
  let content = fs.readFileSync( path, 'binary' )
  sqlContentMap[ fileName ] = content
}
/**
 * 封装所有sql文件脚本内容
 * @return {object}
 */
const getSqlContentMap = () => {
  let sqlMap = getSqlMap()
  for( let key in sqlMap ) {
    getSqlContent( key, sqlMap[key] )
  }
  return sqlContentMap
}

module.exports = getSqlContentMap
