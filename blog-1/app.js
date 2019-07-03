const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

// 处理post data
const getPostData = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    const method = req.method;
    if (method != 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] != 'application/json') {
      resolve({})
      return
    }
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回json
  res.setHeader('Content-type', 'application/json');

  // 获取path
  const url = req.url;
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])

  /**
   * cookie 解析cookie
   */
  req.cookie = {}
  const cookieStr = req.headers.cookie || "" // k1=v1;k2=v2;k3=v3
  // console.log(cookieStr, 'cookietst')
  cookieStr.split(';').forEach(item => {
    if (!item) return;
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val;
  })
  // console.log('req.cookie:', req.cookie)

  // 处理post data
  getPostData(req).then(postData => {
    // 将解析后的参数赋值给req.body;

    req.body = postData
    // 处理blog路由

    const resultBlog = handleBlogRouter(req, res)
    if (resultBlog) {
      return resultBlog.then(blogData => {
        if (blogData) {
          res.end(JSON.stringify(blogData))
        }
        // 注意return放置的位置
        return // 不让代码继续运行
        console.log('1')
      })
    }

    const userData = handleUserRouter(req, res);
    if (userData) {
      return userData.then(data => {
        if (data) {
          res.end(
            JSON.stringify(data)
          )
        }
        return;
      })
    }

    // 未命中路由
    res.writeHead(404, { "Content-type": "text/html" })
    res.write("404 Not Found\n")
    res.end()
  })
}

module.exports = serverHandle



  // const resData = {
  //   name: "devin",
  //   site: 'ddd',
  //   env: process.env.NODE_ENV
  // }

  // res.end(
  //   JSON.stringify(resData)
  // )