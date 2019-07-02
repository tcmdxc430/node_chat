// curl http://localhost:3000/ -H "Cookie: name=s:seck.M/F9kDQ1K5phAxpn3l0I+W9HxLymHWUdfrf5vevvMQU"
// curl http://localhost:3000/ --head
var connect = require('connect')
var cookieParser = require('cookie-parser');
var signature = require('cookie-parser/node_modules/cookie-signature');
// 签名加密值
console.log(signature.sign("seck","coin is coin"));
// 将加密签名进行解密 赋值给req
var app = connect().use(cookieParser('coin is coin'))
.use(function(req,res,next) {
    res.setHeader('Set-Cookie','foo=bar')
    // 覆盖了第一个
    res.setHeader('Set-Cookie','tobi=ferret;Expires=Tue,08 Jun 2021 10:18:14 GMT')
    // 普通cookie
    console.log(req.cookies)
    // 签名cookie 此时如果请求的签名不正确返回{ name: false }
    console.log(req.signedCookies)
    res.end('hello\n')
}).listen(3000)