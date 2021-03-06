
var http = require("http");// 服务器与客户端通信模块
var fs = require("fs");// 文件系统
var path = require("path");// 系统路径
var mime = require("mime"); // 根据文件扩展名得出对应文件mime类型
var cache = {};// 初始化缓存

//所请求的文件不存在时发送404错误
function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: response not found');
    response.end();
}

//提供文件数据服务
function sendFile(response, filePath, fileContents) {
    response.writeHead(200,
        {
            'Content-Type': mime.lookup(path.basename(filePath))
        }
    );
    response.end(fileContents);
}

//提供静态文件服务 如果缓存中有在魂村中读取  如果没有才去文件中查找
function serveStatic(response, cache, absPath) {
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
    }else {
        fs.exists(absPath, function (exists) {
            if(exists){
                fs.readFile(absPath, function (err, data) {
                    console.log('readFile');
                    if(err){
                        send404(response);
                    }else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                })
            }else{
                // 如果硬盘中也不存在
                send404(response);
            }
        })
    }
}

//创建HTTP服务器的逻辑
var server = http.createServer(function (request, response) {
    var filePath = false;
    if(request.url == '/'){
        // 定义默认返回的html
        filePath = 'public/index.html';
    }else{
        filePath = 'public' + request.url;
    };
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});
// 默认用3000端口启动服务器
server.listen(3000,function () {
    console.log('server on localhost:3000');
});

var chatServer = require('./lib/chat_server');//加载自定义模块
// 启动Socket.IO服务器，给它提供一个已经定义好的HTTP服务器，这样它就能跟HTTP服务器共享同一个TCP/IP端口
chatServer.listen(server)