
const mysql = require('mysql')
const { mysqlMaster, mysqlSlave } = require('../../config')

// 单次连接
const connection = mysql.createConnection(mysqlMaster)

// 连接池
const poolCluster = mysql.createPoolCluster({
  restoreNodeTimeout: 5000
})
// 分片
const master = 'master'
const slave = 'slave'
poolCluster.add(master, mysqlMaster)
poolCluster.add(slave, mysqlSlave)

//断开连接
const _release = (connection) => {
  try {
    connection.release()
  } catch (err) {
    console.log('DB-关闭数据库连接异常！- 2: ' + err)
  }
}
//关闭poolCluster
poolCluster.end = () => {
  // close all connections
  poolCluster.end((err) => {
    if(err){
      console.log('poolCluster 关闭错误: ' + err)
    }else {
      // all connections in the pool cluster have ended
      console.log('poolCluster 关闭成功')
    }
  })
}
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    poolCluster.getConnection(slave, (err, connection) => {
      if (err) {
        reject(err)
        _release(connection)
        return false
      }
      connection.query(sql, values, (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
        _release(connection)
      })
    })
  })
}
const setData = (sql, values) => {
  return new Promise((resolve, reject) => {
    poolCluster.getConnection(master, (err, connection) => {
      if (err) {
        reject(err)
        _release(connection)
        return false
      }
      connection.query(sql, values, (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
        _release(connection)
      })
    })
  })
}

module.exports = {
  query,
  setData
}
