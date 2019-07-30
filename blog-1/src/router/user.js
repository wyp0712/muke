
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 同域名 cookie可以共享



handerUserRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  
  if (method == 'GET' && path === '/api/user/login') {
    const { username, password } = req.query
    const loginData = login(username, password)
    return loginData.then(data => {
       if (data.username) {
         /**
          * @param[httpOnly]: 只允许服务端修改cookie
          * @param[path:/]: 适用与所有的路由，根路由
          **/
         // 设置session
         req.session.username = data.username
         req.session.realname = data.realname

         console.log(req.session, 'session')
        return new SuccessModel('登陆成功')
       } else {
        return new ErrorModel('登陆博客失败')
       }
    })
  }

  /**
   * @fun [测试]
   */
  if (method == 'GET' && path === '/api/user/login-test') {
    if (req.session) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }))
    }
    return Promise.resolve(new ErrorModel('登陆博客失败'))
  }
}

module.exports = handerUserRouter