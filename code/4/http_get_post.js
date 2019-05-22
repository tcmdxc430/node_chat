var http = require('http');
var items = [];
var qs = require('querystring')

var server = http.createServer(function(req, res){
  console.log(req.url)
  if ('/' == req.url) {
    switch (req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        add(req, res);
        break;
      default:
        badRequest(res);
    }
  } else {
    notFound(res);
  }
});

server.listen(3000);

function show(res) {
  var html = `<html>
  <head><title>aa</title></head><body>
      <h1>todolist</h1><ul>${items.map(function(item){return `<li>${item}</li>`}).join('')}</ul>
      <form action="" method="POST"><p><input type="text" name="item"></p><p><input type="submit" value="add item"></p></form>
  </body>
</html>`
  res.setHeader('Content-Type','text/html')
  // 返回html字节长度
  res.setHeader('Content-Length',Buffer.byteLength(html))
  res.end(html)
}

function notFound(res) {
  res.statusCode = 404
  res.setHeader('Content-Type','text/plain')
  res.end('not found')
}
function badRequest(res) {
  res.statusCode = 400
  res.setHeader('Content-Type','text/plain')
  res.end('bad req')
}

function add(req,res) {
  var body = ''
  req.setEncoding('utf8')
  req.on('data',function(chunk) {
    console.log(chunk)
    body+=chunk
    console.log(body)
  })
  req.on('end',function() {
    // 将item=aaa解析为{ item: 'aaa' }
    var obj = qs.parse(body)
    console.log(obj)
    items.push(obj.item)
    
    show(res)
  })
}
