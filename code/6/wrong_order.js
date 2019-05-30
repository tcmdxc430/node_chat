/**
 * 错误的中间件执行顺序演示
 */
var connect = require('connect');
// 第一个中间件 记录请求内容
function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  // 当一个组件不调用next()时，命令链中的后续中间件都不会被调用
  next();
}
// 用“hello world”响应HTTP请求
function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}
// 因为hello不调用next()，所以logger永远不会被调用
var app = connect()
  .use(hello)
  .use(logger)
  .listen(3000);
