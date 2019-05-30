/**
 * 用Redis的发布/预订功能实现的简单聊天服务器
 */
var net = require('net');
var redis = require('redis');
// 为每个连接到聊天服务器上的用户定义设置逻辑
var server = net.createServer(function(socket) {
  var subscriber;
  var publisher;
  // 为用户创建预订客户端
  socket.on('connect', function() {
    subscriber = redis.createClient();
    // 预订信道
    subscriber.subscribe('main_chat_room');
    // 信道收到消息后，把它发给用户
    subscriber.on('message', function(channel, message) {
      socket.write('Channel ' + channel + ': ' + message);
    });
    // 为用户创建发布客户端
    publisher = redis.createClient();
  });

  socket.on('data', function(data) {
    // 用户输入消息后发布它
    publisher.publish('main_chat_room', data);
  });

  socket.on('end', function() {
    // 如果用户断开连接，终止客户端连接
    subscriber.unsubscribe('main_chat_room');
    subscriber.end();
    publisher.end();
  });
});

server.listen(3000);
