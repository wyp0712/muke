const { exec } = require('../db/mysql')

const login = (username, password) => {
   const sql = ` 
     select username, realname from users where username='${username}' and password='${password}'
   `
   return exec(sql).then(loginData => {
     if (loginData.length) {
      return loginData[0]
     }
     return false
   })
}

module.exports = {
  login
}