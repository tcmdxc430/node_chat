// curl --user tobi:ferret http://localhost:3000/admin/users
var connect = require('connect');

function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

function authenticateWithDatabase(user, pass, callback) {
  var err;
  if (user != 'tobi' || pass != 'ferret') {
    err = new Error('Unauthorized');
  }
  callback(err);
}
// 实现HTTP Basic认证的中间件组件
function restrict(req, res, next) {
  var authorization = req.headers.authorization;
  console.log(authorization)
  if (!authorization) return next(new Error('Unauthorized'));
  // split把传入值替换成逗号用以分割 返回数组
  var parts = authorization.split(' ');
  console.log(parts)
  var scheme = parts[0];
  // new Buffer()将base64编码的parts[1]转为二进制
  var auth = new Buffer(parts[1], 'base64').toString().split(':');
  console.log(auth)
  var user = auth[0];
  var pass = auth[1];
  // 根据数据库中的记录检查认证信息的函数
  authenticateWithDatabase(user, pass, function (err) {
    if (err) return next(err);// 这相当于通知Connect程序中出现了错误
    next();
  });
}
// 原始路由
function admin(req, res, next) {
  switch (req.url) {
    case '/':
      res.end('try /users');
      break;
    case '/users':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(['tobi', 'loki', 'jane']));
      break;
  }
}

connect()
  .use(logger)
  // 当.use()的第一个参数是个字符串时，只有URL前缀与之匹配时，Connect才会调用后面的中间件
  .use('/admin', restrict)
  .use('/admin', admin)
  .use(hello)
  .listen(3000);
