const mysql = require('mysql')
const { query, setData } = require('../db/index')
const { err, succ } = require('../../util/res')

const tableName = 'book'

// 创建PID
const createPid = async (params) => {
  let sql = `INSERT INTO ${tableName} SET ?`
  let sqlParent = `SELECT * FROM ${tableName} WHERE id=${mysql.escape(params.pid)}`
  try {
    let dataList = await setData(sql, params)
    let parentData = await query(sqlParent)
    if (parentData.length) {
      await setData(`UPDATE ${tableName} SET isChildren= ? WHERE id =?`, [1, params.pid])
    }
    return succ(dataList)
  } catch (error) {
    return err(400, error.message)
  }
}

// 更新数据
const updatePageInfo = async (title, bookDesc, body, updateTime, author, id) => {
  let sql = `UPDATE ${tableName} SET title= ?, bookDesc = ?, body = ?, updateTime = ?, effect = ?, author = ? WHERE id=?`
  let updateData = [title, bookDesc, body, updateTime, 0, author, id]
  let dataList = await setData(sql, updateData)
  return succ(dataList.protocol41)
}
// 删除单条数据
const deletePage = async (id, pid) => {
  let sql = `DELETE FROM ${tableName} WHERE id = ${id}`
  let sqlPid = `DELETE FROM ${tableName} WHERE pid = '${id}'`
  let sqlParent = `SELECT * FROM ${tableName} WHERE pid=${mysql.escape(pid)}`
  let dataList = await setData(sql)
  let dataPidList = await setData(sqlPid)
  let parentData = await query(sqlParent)
  if (!parentData.length) {
    await setData(`UPDATE ${tableName} SET isChildren= ? WHERE id =?`, [0, pid])
  }
  return [dataList, dataPidList]
}
// 查询BYID
const queryById = async (id, isDetail) => {
  let sql = `SELECT * FROM ${tableName} WHERE id=${mysql.escape(id)}`
  try {
    let dataList = await query(sql)
    if (isDetail) {
      let item = Object.assign({ children: [] }, dataList[0])
      return succ(item)
    }
    return succ(dataList.map(item => ({
      id: item.id,
      pid: item.pid,
      system: item.system,
      children: [],
      title: item.title,
      isChildren: item.isChildren,
      sort: item.sort
    }))[0])
  } catch (error) {
    return err(400, error.message)
  }
}
// 查询子节点
const getChildrenList = async (pid) => {
  let sql = `SELECT * FROM ${tableName} WHERE pid=${mysql.escape(+pid)}`
  try {
    let dataList = await query(sql)
    return succ(dataList.map(item => ({
      id: item.id,
      pid: item.pid,
      system: item.system,
      children: [],
      title: item.title,
      isChildren: item.isChildren,
      sort: item.sort
    })))
  } catch (error) {
    return err(400, error.message)
  }
}

// 查询菜单数据
const queryData = async (system) => {
  let sql = `SELECT * FROM ${tableName} WHERE system = "${system}" AND pid = "${system}" ORDER BY sort ASC`
  try {
    let dataList = await query(sql)
    let menuList = dataList.map(item => ({
      id: item.id,
      pid: item.pid,
      system: item.system,
      title: item.title,
      children: [],
      isChildren: item.isChildren,
      sort: item.sort
    }))
    return succ(menuList)
  } catch (error) {
    return err(400, error.message)
  }
}

module.exports = {
  createPid,
  queryById,
  queryData,
  updatePageInfo,
  getChildrenList,
  deletePage
}
