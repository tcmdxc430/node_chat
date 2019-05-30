/**
 * 链接redis数据库:键值对 哈希表 链表 集合
 */
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
// 定义自己的错误处理逻辑
client.on('error', function (err) {
  console.log('Error ' + err);
});
// 设置键值对 print函数输出操作的结果，或在出错时输出错误
client.set('color', 'red', redis.print);
client.get('color', function(err, value) {
  if (err) throw err;
  console.log('Got: ' + value);
});
// Redis命令hmset设定哈希表中的元素，用键标识值。
client.hmset('camping', {
  'shelter': '2-person tent',
  'cooking': 'campstove'
}, redis.print);
// 获取元素"cooking"的值
client.hget('camping', 'cooking', function(err, value) {
  if (err) throw err;
  console.log('Will be cooking with: ' + value);
});
// hkeys列出哈希表中所有元素的键
client.hkeys('camping', function(err, keys) {
  if (err) throw err;
  keys.forEach(function(key, i) {
    console.log(' ' + key);
  });
});
// Redis命令lpush向链表中添加值
client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
// lrange获取参数start和end范围内的链表元素
// 参数end为-1，表明到链表中最后一个元素
client.lrange('tasks', 0, -1, function(err, items) {
  if (err) throw err; 
  items.forEach(function(item, i) {
    console.log(' ' + item);
  });
});

// 用集合存储和获取数据,集合获取数据的性能比链表好
// Redis命令sadd尝试将值添加到集合中
client.sadd('ip_addresses','204.10.37.69',redis.print)
// 重复添加只显示第一次
client.sadd('ip_addresses','204.10.37.69',redis.print)
client.sadd('ip_addresses','72.10.37.69',redis.print)
// smembers返回存储在集合中的值
client.smembers('ip_addresses',function(err,members) {
  if(err) throw err
  console.log(members)
})
