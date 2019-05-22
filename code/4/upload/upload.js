var http = require('http');
// 处理上传数据
var formidable = require('formidable')

var server = http.createServer(function(req, res){
    switch (req.method) {
      case 'GET':
        show(req,res);
        break;
      case 'POST':
        upload(req, res);
        break;
    }
});
server.listen(3000);
// 展示基础表单
function show(req,res) {
    var html = `<form action="/" method="POST" enctype="multipart/form-data">
                    <p><input type="text" name="name"></p>
                    <p><input type="file" name="file"></p>
                    <p><input type="submit" value="Upload"></p>
                </form>`
    res.setHeader('Content-Type','text/html')
    // 返回html字节长度
    res.setHeader('Content-Length',Buffer.byteLength(html))
    res.end(html)
}

function upload(req,res) {
  if(!isFormData(req)) {
    res.statusCode = 400
    res.end('bad')
    return
  }
 
  // 要初始化一个新的formidable.IncomingForm表单,默认情况下，它会把上传的文件流入/tmp目录下
  var form = new formidable.IncomingForm()

  // 接收完输入框中文本
  // form.on('field',function(field,value) {
  //   console.log(field)
  //   console.log(value)
  // })
  // // 收到文件并处理好后
  // form.on('file',function(name,file) {
  //   console.log(name)
  //   console.log(file)
  // })
  // // 接收完成后触发
  // form.on('end',function() {
  //   res.end('up ok')
  // })

  // 将各个监听整合
  form.parse(req,function(err,fields,files) {
    console.log(fields)
    console.log(files)
    res.end('ok')
  })
}
// 判断请求的是不是multipart/form-data
function isFormData(req) {
  var type = req.headers['content-type'] || ''
  return 0 == type.indexOf('multipart/form-data')
}