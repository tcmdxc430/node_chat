// 创建静态文件服务器 并完善错误callback
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
// 是该文件所在目录的路径
var root = __dirname;
var server = http.createServer(function(req, res){
  var url = parse(req.url);
  var path = join(root, url.pathname);
  // 检查文件是否存在
  fs.stat(path, function(err, stat){
    if (err) {
      // 文件没找到code
      if ('ENOENT' == err.code) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    } else {
      res.setHeader('Content-Length', stat.size);
      var stream = fs.createReadStream(path);
      stream.pipe(res);
      stream.on('error', function(err){
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    }
  });
});
server.listen(3000, '127.0.0.1')
