//curl http://localhost:3000/index.js -i
var express = require("express");
// 压缩响应数据
var compression = require('compression')
var serveStatic = require('serve-static')

var app = express()
app.use(compression({filter: shouldCompress,level:4,memlevel:8}))
app.use("/",express.static(__dirname + "/source"));


function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        alert('f')
      // 这里就过滤掉了请求头包含'x-no-compression'
      return false
    }
  
    return true
  }
app.listen(3000)