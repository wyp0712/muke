const redis = require('redis')

const { REDIS_CONF } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', (err) => {
  console.error(err)
})


function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }

  redisClient.set(key, val, redis.print)
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get('myname', (err, val) => {
      if (err) {
        reject(err)
        return
      }
      
      if (val === null) {
        resolve(null)
        return
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (e) { // 如果不是json格式，就直接返回
        resolve(val)
      }


      // redisClient.quit() // 退出
    })
  })

  return promise
}

module.exports = {
  set,
  get
}