// connect用户名密码验证
// curl --user dxc:332211 http://localhost:3000
var connect = require('connect');
var basicAuth = require('basic-auth-connect');
var app = connect();

app.use(basicAuth('dxc','332211'))
app.use(function(req,res){
    res.end('welcome')
})

app.listen(3000);
