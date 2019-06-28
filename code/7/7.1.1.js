// curl http://localhost:3000/ -H "Cookie: name=s:seck.M/F9kDQ1K5phAxpn3l0I+W9HxLymHWUdfrf5vevvMQU"
var connect = require('connect')
var cookieParser = require('cookie-parser');
var signature = require('cookie-parser/node_modules/cookie-signature');
// 签名加密值
console.log(signature.sign("seck","coin is coin"));
// 将加密签名进行解密 赋值给req
var app = connect().use(cookieParser('coin is coin'))
.use(function(req,res,next) {
    // 普通cookie
    console.log(req.cookies)
    // 签名cookie 此时如果请求的签名不正确返回{ name: false }
    console.log(req.signedCookies)
    res.end('hello\n')
}).listen(3000)