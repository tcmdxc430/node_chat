// 创建一个https的服务器
/**
    1、生成私钥命令
　　openssl genrsa -out server.key 2048
　　2、创建证书
　　openssl req -new -sha256 -key server.key -out csr.pem
　　2、创建证书，创建证书需要私钥。
　　openssl x509 -req -in csr.pem -signkey server.key -out cert.pem
 * */
var https = require('https')
var fs = require('fs')

var options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./cert.pem')
}

https.createServer(options,function(req,res) {
    res.writeHead(200)
    res.end('https server')
}).listen(3000)
