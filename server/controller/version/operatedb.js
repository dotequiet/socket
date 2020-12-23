const { query, setData } = require('../db/index')

// 查询所有数据按版本排序
const selectAllData = async (system, isEffect) => {
  let sql = `SELECT * FROM booklet ORDER BY version`
  if (system) {
    sql = `SELECT * FROM booklet WHERE system="${system}" ORDER BY version DESC`
    if (isEffect) {
      sql = `SELECT * FROM booklet WHERE system="${system}" AND effect=1 ORDER BY version DESC`
    }
  }
  let dataList = await query(sql)
  return dataList
}

// ID义查询
const selectDataById = async (id) => {
  let sql = `SELECT * FROM booklet WHERE id=${id}`
  let dataList = await query(sql)
  return dataList
}

// 自定义查询
const selectByCondition = async (condition) => {
  let sql = `SELECT * FROM booklet WHERE ${condition}`
  console.log('selectByCondition', sql)
  let dataList = await query(sql)
  return dataList
}

// 插入数据
const insertData = async (data = {
  effect: 1,
  version: '1.0.0',
  system: 'moa',
  dataInfo: JSON.stringify([{title: 1}])
}) => {
  let params = Object.assign(data, {
    createTime: +new Date()
  })
  let sql = 'INSERT INTO booklet SET ?'
  let dataList = await setData(sql, params)
  return dataList
}

// 删除单条数据
const deleteVersion = async (id) => {
  let sql = `DELETE FROM booklet WHERE id=${id}`
  let dataList = await setData(sql)
  return dataList
}

// 生效单条版本
const publishVersion = async (id) => {
  let sql = `UPDATE booklet SET effect = ? WHERE id =?`
  let updateData = [1, id]
  let dataList = await setData(sql, updateData)
  return dataList
}
// 编辑
const updateData = async (id, updateTime, dataInfo) => {
  let sql = `UPDATE booklet SET updateTime = ?, dataInfo = ?, effect = ? WHERE id =?`
  let updateData = [updateTime, dataInfo, 0, id]
  let dataList = await setData(sql, updateData)
  return dataList
}

module.exports = {
  selectAllData,
  insertData,
  deleteVersion,
  publishVersion,
  selectDataById,
  selectByCondition,
  updateData
}
