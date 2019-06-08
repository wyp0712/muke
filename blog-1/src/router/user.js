
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

handerUserRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  
  if (method == 'GET' && path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const loginData = login(username, password)
    return loginData.then(data => {
       if (data.username) {
         /**
          * @param[httpOnly]: 只允许服务端修改cookie
          * @param[path:/]: 适用与所有的路由，根路由
          **/
        res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly`)

        return new SuccessModel('登陆成功')
       } else {
        return new ErrorModel('登陆博客失败')
       }
    })
  }

  // 测试
  // if (method == 'GET' && path === '/api/user/login-test') {
  //   if (req.cookie.username) {
  //     return Promise.resolve(new SuccessModel('登陆成功'))
  //   }
  //   return Promise.resolve(new ErrorModel('登陆博客失败'))
  // }

}

module.exports = handerUserRouter