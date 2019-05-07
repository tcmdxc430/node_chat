// 将json数据渲染到html的逻辑

var http = require('http')
var fs = require('fs')
//创建HTTP服务器并用回调定义响应逻辑
http.createServer(function(req,res) {
    if(req.url == '/') {
        // 读取JSON文件并用回调定义如何处理其中的内容
        fs.readFile('./titles.json',function(err,data) {
            // 如果出错，输出错误日志，并给客户端返回“errrrrr”
            if(err) {
                console.error(err)
                res.end('errrrrrr')
            }else{
                // 从JSON文本中解析数据
                var titles = JSON.parse(data.toString())
                // 读取HTML模板，并在加载完成后使用回调
                fs.readFile('./template.html',function(err,data) {
                    if(err) {
                        console.error(err)
                        res.end('errrrrrr')
                    }else{
                        var tmpl = data.toString()
                        var html = tmpl.replace('%',titles.join('</li><li>'))
                        res.writeHead(200,{'Content-Type':'text/html'})
                        // 发送给客户端
                        res.end(html)
                    }
                })
            }
        })
    }
}).listen(8000,'127.0.0.1')