const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

// 统一执行mysql函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, data) => {
       if (err) {
         reject(new Error(err))
         return
       }
       resolve(data)
    })
  })
}

module.exports = {
  exec
}