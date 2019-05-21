// 创建静态文件服务器
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
// 是该文件所在目录的路径
var root = __dirname;

var server = http.createServer(function(req, res){
  var url = parse(req.url);
  // 将pathname拼接到root后
  var path = join(root, url.pathname);
  
  var stream = fs.createReadStream(path);
  
  stream.pipe(res)
  stream.on('error',function(err) {
    res.statusCode = 500
    res.end('500')
  })
  // 将文件数据写到响应中
  // stream.on('data', function(chunk){
  //   res.write(chunk);
  // });
  // stream.on('end', function(){
  //   res.end();
  // });
});

server.listen(3000, '127.0.0.1')