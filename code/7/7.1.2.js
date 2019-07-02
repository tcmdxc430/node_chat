/**
 * bodyParser()：解析请求主体。它整合了其他三个更小的组件：json(), urlencoded(), 和 multipart()。
 */
// 模拟json上传 curl -d "{\"username\":\"tobi\"}" -H "Content-Type:application/json" http://localhost:3000 其中需将双引号转义
// 模拟对象上传 curl -d username=tb http://localhost:3000
// 模拟文件上传 curl -F image=@notice.png -F name=tobi http://localhost:3000
var connect = require('connect')
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var app = connect()
// 解析json输入时
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
// 解析文件上传时
app.use(multipart());

app.use(function(req,res) {
    console.log(req.body)
    console.log(req.files)
    res.end('new user:'+req.body.username)
}).listen(3000)


