const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  // 先返回假数据，（格式是正确的）
  // xx.html?a=1&k1=v1&k2=v2&k3=v3;
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回promise实例
  return exec(sql);
}

// 详情
const getDetail = (id) => {
  const sql = `select * from blogs where id=${id}`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

// new Blog
const newBlog = (blogData = {}) => {
  // blogData 是一个对象，包含title content 属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
       insert into blogs (title, content, createtime, author) 
       values ('${title}', '${content}', ${createTime}, '${author}');
  `
  return exec(sql).then(insetData => {
    return {
      id: insetData.insertId
    }
  })
}

// 更新blog 
const updateBlog = (id, blogData = {}) => {
  // ID 要更新博客的id blogData 是一个对象，包含title content 属性
  const title = blogData.title
  const content = blogData.content
  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) { // 通过判断更新后的行数
        return true
    }
    return false
  })
}

// 删除博客
const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) { // 通过判断更新后的行数
        return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}