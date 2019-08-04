// 引入controller

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登陆验证函数
const loginCheck = (req) => {
   if (!req.session.username) {
     return Promise.resolve(
       new ErrorModel('尚未登陆')
     )
   }
}


const handerBlogRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const id = req.query.id

  // 获取博客列表的接口
  if (method == 'GET' && path === '/api/blog/list') {
  
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const results = getList(author, keyword)
    return results.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method == 'GET' && path === '/api/blog/detail') {
    const id = req.query.id
    if (id) {
      const getDetailData = getDetail(id)
      return getDetailData.then(data => {
        return new SuccessModel(data)
      })
    } else {
      return Promise.resolve(new SuccessModel('参数有误，id 你带了吗'))
    }
  }

  // 新建博客
  if (method == 'POST' && path === '/api/blog/new') {
     
    // 登陆验证
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    const blogData = req.body
    req.body.author = req.session.username
    const data = newBlog(blogData)
    return data.then(res => {
      return new SuccessModel(res)
    })
  }

  // 更新博客的接口
  if (method == 'POST' && path === '/api/blog/update') {

     // 登陆验证
     const loginCheckResult = loginCheck(req)
     if (loginCheckResult) {
       return loginCheckResult
     }

    const result = updateBlog(id, req.body)
    return result.then(res => {
      if (res) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除博客接口
  if (method == 'POST' && path === '/api/blog/del') {

     // 登陆验证
     const loginCheckResult = loginCheck(req)
     if (loginCheckResult) {
       return loginCheckResult
     }

    const author = req.body.author = req.session.username
    const res = deleteBlog(id, author)
     return res.then(delState => {
      if (delState) {
        return new SuccessModel('删除成功')
      } else {
        return new ErrorModel('删除博客失败')
      }
     })
  }
}

module.exports = handerBlogRouter;