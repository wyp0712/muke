/**
 *Creates an instance of baseModel.
 * @param {*} data {}
 * @param {*} message  消息
 * @memberof baseModel 
 * @memberof SuccessModel
 * @memberof ErrorModel
 */
class baseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends baseModel {
  constructor(data, message) {
    super(data, message) // 执行父元素中的函数
    this.errno = 0;
  }
}

class ErrorModel extends baseModel {
  constructor(data, message) {
    super(data, message) // 执行父元素中的函数
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}