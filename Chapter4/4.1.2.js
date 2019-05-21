/**
 * Created by baymax on 16/8/8.
 */
var http = require('http');

var server = http.createServer(function (req, res) {
    console.log(req.url);
    
    res.end('hhah');
}).listen(3001, '127.0.0.1');