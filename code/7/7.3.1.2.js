// connect回调验证用户名密码是否在哈希表中
var connect = require('connect');
var basicAuth = require('basic-auth-connect');
var app = connect();
var users = {
    dxc:'tc',
    aa:'aa'
}
app.use(basicAuth(function(user, pass){
    console.log(user)
    // return 'tj' == user && 'wahoo' == pass;
    
    return users[user] === pass
  }))

app.listen(3000);