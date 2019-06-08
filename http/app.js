const http = require('http');

const querystring = require('querystring');
// const server = http.createServer((req, res) => {
//    console.log("method:", req.method) // GET
//    const url = req.url;
//    console.log("url:", url)
//    req.query = querystring.parse(url.split("?")[1]);
//    console.log(req.query, 'query')
//    res.end("hello world")
// })


// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     console.log("req-header:", req.headers["content-type"]);

//     var postData = "";
//     req.on('data', chunk => {
//       postData += chunk.toString();
//     })

//     req.on('end', () => {
//       console.log("postData", postData)
//       res.end('hello world')
//     })
//   }
// })
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = req.url.split('?')[0]
  const query = querystring.parse(url.split("?")[1]);

  // 设置返回的数据格式为json
  res.setHeader('Content-type', 'application/json');

  let poseData = {
    method,
    url,
    path,
    query
  }

  if (req.method === 'GET') {
    res.end(JSON.stringify(poseData))
  } else {
    let postData = "";
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      res.end(JSON.stringify(poseData))
    })
  }



  // if (req.method === 'POST') {
  //   console.log("req-header:", req.headers["content-type"]);

  //   var postData = "";
  //   req.on('data', chunk => {
  //     postData += chunk.toString();
  //   })

  //   req.on('end', () => {
  //     console.log("postData", postData)
  //     res.end('hello world')
  //   })
  // }
})


server.listen(8000, () => {
  console.log("8000")
})