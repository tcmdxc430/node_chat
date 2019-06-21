// 创建可配置的logger中间件组件

// setup函数可以用不同的配置调用多次
function setup(format) {
  // logger组件用正则表达式匹配请求属性
  var regexp = /:(\w+)/g;
  // Connect使用的真实logger组件
  return function logger(req, res, next) {
    // 用正则表达式格式化请求的日志条目
    var str = format.replace(regexp, function(match, property){
      return req[property];
    });

    console.log(str);

    next();
  }
}

module.exports = setup;
