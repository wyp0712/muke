const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
     host: 'localhost',
     user: 'root',
     password: '3051532wyp',
     port: 3306,
     database: 'myblog'
  }
}

if (env === 'production') {
  MYSQL_CONF = { // 线上环境
    host: 'localhost',
    user: 'root',
    password: '3051532wyp',
    port: 3306,
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}