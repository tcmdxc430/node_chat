// 将json数据渲染到html的逻辑 解除循环嵌套版本

var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req,res) {
    //控制权转交给了getTitles
    getTitles(res)
}).listen(8000,'127.0.0.1')
// 获取标题，并将控制权转交给getTemplate
function getTitles(res) {
    fs.readFile('./titles.json',function(err,data){
        if(err) {
            hadError(err,res)
        }else{
            getTemplate(JSON.parse(data.toString()),res)
        }
    })
}
// getTemplate读取模板文件，并将控制权转交给formatHtml
function getTemplate(titles,res){
    fs.readFile('./template.html',function(err,data) {
        if(err) {
            hadError(err,res)
        }else{
            formatHtml(titles,data.toString(),res)
        }
    })
}
// formatHtml得到标题和模板，渲染一个响应给客户端
function formatHtml(titles,tmpl,res) {
    var html = tmpl.replace('%',titles.join('</li><li>'))
    res.writeHead(200,{'Content-Type':'text/html'})
    // 发送给客户端
    res.end(html)
}
function hadError(err,res) {
    console.error(err)
    res.end('errrrrrr')
}