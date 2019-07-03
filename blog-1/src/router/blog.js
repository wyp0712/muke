// 引入controller

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')


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
    const getDetailData = getDetail(id)
    return getDetailData.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建博客
  if (method == 'POST' && path === '/api/blog/new') {
    const blogData = req.body
    req.body.author = 'zhangsan'
    const data = newBlog(blogData)
    return data.then(res => {
      return new SuccessModel(res)
    })
  }

  // 更新博客的接口
  if (method == 'POST' && path === '/api/blog/update') {
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
    const author = req.body.author = 'zhangsan'
    const res = deleteBlog(id, author)
     return res.then(delState => {
      if (delState) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
     })
  }
}

module.exports = handerBlogRouter;