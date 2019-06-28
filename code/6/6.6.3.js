// 错误处理分别展示到用户端 和开发端
var connect = require('connect');

function hello(req, res, next) {
  // 匹配/hello
  if (req.url.match(/^\/hello/)) {
    res.end('Hello World\n');
  } else {
    next();
  }
}

var db = {
  users: [
    { name: 'tobi' },
    { name: 'loki' },
    { name: 'jane' }
  ]
};

function users(req, res, next) {
  // 匹配user/且后面有内容
  var match = req.url.match(/^\/user\/(.+)/);

  if (match) {
    var user = db.users[match[1]];
    // 检查用户索引是否存在
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      var err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  } else {
    next();
  }
}

function pets(req, res, next) {
  if (req.url.match(/^\/pet\/(.+)/)) {
    console.log('match')
    // 由于没有foo 触发errorHandler
    foo();
  } else {
    next();
  }
}

function errorHandler(err, req, res, next) {
  // 手动展示程序的报错信息
  console.error(err.stack);
  res.setHeader('Content-Type', 'application/json');
  // 定义错误展示内容
  if (err.notFound) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: err.message }));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

connect()
  .use(users)
  .use(pets)
  .use(errorHandler)
  .use(hello)
  .listen(3000);
