var parse = require('url').parse;

module.exports = function route(obj) {
  return function(req, res, next){
    // 判断是否有请求的接口
    if (!obj[req.method]) {
      next();
      return;
    }
    var routes = obj[req.method];
    // url包含url中参数 查询等信息
    var url = parse(req.url);
    // 将所有get接口放进一个数组
    var paths = Object.keys(routes);
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      // 当接口对应的方法
      var fn = routes[path];
      
      path = path
        .replace(/\//g, '\\/')
        .replace(/:(\w+)/g, '([^\\/]+)');
      // 将正则构造好的字符串前后加上符号
      var re = new RegExp('^' + path + '$');
      // 识别输入的是哪个接口命令
      var captures = url.pathname.match(re);
      console.log(captures)
      if (captures) {
        // slice 选取从start(包含)到end(不包含)之间的元素 并返回一个新数组 如只有start表示选取start到结尾  start=-1表示最后一    个元素开始算起
        // args表示将输入接口命令最后的参数 拼接到请求和答复最后
        var args = [req, res].concat(captures.slice(1));
        // apply 第一个参数继承fn的属性和方法并将第二个参数args传入fn，也就是将输入的参数传给652js中的方法
        fn.apply(null, args);
        // console.log(fn)
        return;
      }
    }
    next();
  }
};
