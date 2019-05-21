
/**
 * POST请求体字符串缓存
 * */
var http = require('http');
var url = require('url');
var items = [];     //用一个常规的 JavaScript数组存放数据

var server = http.createServer(function (req, res) {
    console.log(req.method)
    switch (req.method){
        case 'POST':
            var item = '';
            req.setEncoding('utf-8');
            req.on('data',function (chunk) {
                item += chunk;
                console.log('item:'+item);
            });
            req.on('end',function () {
                items.push(item);
                console.log(items);
                res.end('OK\n');
            });
            break;
        case 'GET':
            items.forEach(function (item, i) {
                res.write(i + ') ' + item + '\n');
            });
            res.write("hello socket");
            res.end();
            break;
    }
});

server.listen(3000, '127.0.0.1');