var connect = require('connect');

function badMiddleware(req, res, next) {
  next(new Error('Bad middleware makes error'));
}

function errorHandler() {
  var env = process.env.NODE_ENV || 'development';
  // 错误处理中间件函数必须接受四个参数：err、req、res和next，如下面的代码清单所示，而常规的中间件只有三个参数：req、res和next。
  return function(err, req, res, next) {
    res.statusCode = 500;
    switch (env) {
      case 'development':
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));
        break;
      default:
        res.end('Server error');
    }
  }
}

connect()
  .use(badMiddleware)
  .use(errorHandler)
  .listen(3000);
