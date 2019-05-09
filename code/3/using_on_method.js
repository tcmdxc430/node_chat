// echo服务器
var net = require('net');

var server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    console.log('data');
    socket.write(data);
  });
});
// 每次刷新8888端口 都会触发
server.listen(8888);
