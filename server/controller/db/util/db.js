const mysql = require('mysql')
const { mysqlMaster } = require('../../../config')

const pool = mysql.createPool(mysqlMaster)
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err)
        connection.release()
        return false
      }
      connection.query(sql, values, ( err, rows) => {
        if ( err ) return reject( err )
        resolve( rows )
        connection.release()
      })
    })
  })
}
module.exports = {
  query
}
