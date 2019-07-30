// connect回调验证用户名密码是否在哈希表中
var connect = require('connect');
var basicAuth = require('basic-auth-connect');
var app = connect();

app.use(basicAuth(function(user, pass, callback){
    // 执行数据库验证函数
    User.authenticate({ user: user, pass: pass }, gotUser);
    // 当数据库响应完成时运行异步回调函数
    function gotUser(err,user) {
        if(err) return callback(err)
        // 把从数据库里得到的user对象传给basicAuth()的回调函数
        callback(null,user)
    }
  }))

app.listen(3000);