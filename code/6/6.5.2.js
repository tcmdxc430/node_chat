/**
 * 构建路由中间件组件
 */
var connect = require('connect');
var router = require('./middleware/router');
// 定义路由的对象
var routes = {
  GET: {
    '/users': function(req, res){
      res.end('tobi, loki, ferret');
    },
    // 其中的每一项都是对请求URL的映射，并包含要调用的回调函数
    '/user/:id': function(req, res, id){
      res.end('user ' + id);
    }
  },
  DELETE: {
    '/user/:id': function(req, res, id){
      res.end('deleted user ' + id);
    }
  }
};

connect()
  .use(router(routes))
  .listen(3000);
