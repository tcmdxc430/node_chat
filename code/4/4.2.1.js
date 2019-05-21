var http = require('http');
var server = http.createServer(function(req, res){
    // 只要读入了新的数据块，就触发data事件
    req.on('data',function(chunk) {
        console.log('parsed',chunk)
    })
    // 数据全部读完之后触发end事件
    req.on('end',function() {
        console.log('done')
        res.end()
    })
}).listen(3001, '127.0.0.1')