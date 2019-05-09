var events = require('events')
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
// 添加join事件的监听器
channel.on('join', function(id, client) {
  var welcome = '当前人数'+this.listeners('broadcast').length
  // 保存用户的client对象，以便程序可以将数据发送给用户
  this.clients[id] = client; 
  this.subscriptions[id] = function(senderId, message) {
    // 发送给自己以外的连接
    if (id != senderId) { 
      this.clients[id].write(message);
    }
    client.write(welcome+'\n')
  }
  // 添加一个专门针对当前用户的broadcast事件监听器
  this.on('broadcast', this.subscriptions[id]); 
});
// 创建leave事件的监听器
channel.on('leave', function(id) { 
  // 移除指定客户端的broadcast监听器
  channel.removeListener('broadcast', this.subscriptions[id]); 
  channel.emit('broadcast', id, id + " has left the chat.\n");
});
// 想停止提供聊天服务，但又不想关掉服务器 removeAllListeners事件发射器方法去掉给定类型的全部监听器
channel.on('shutdown', function() {
  channel.emit('broadcast', '', "Chat has shut down.\n");
  channel.removeAllListeners('broadcast');
});

var server = net.createServer(function (client) {
  var id = client.remoteAddress + ':' + client.remotePort;
  // 当有用户连到服务器上来时发出一个join事件，指明用户ID和client对象
  client.on('connect', function() {
    channel.emit('join', id, client); 
  });
  client.on('data', function(data) {
    data = data.toString();
    // 以添加一个停止服务的聊天命令。
    if (data == "shutdown\r\n") {
      channel.emit('shutdown');
    }
    // 当有用户发送数据时，发出一个频道broadcast事件，指明用户ID和消息
    channel.emit('broadcast', id, data); 
  });
  // 在用户断开连接时发出leave事件
  client.on('close', function() {
    channel.emit('leave', id); 
  });
});
server.listen(8888);
