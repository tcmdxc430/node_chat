// vhost将多个子域名使用一个程序控制
var connect = require('connect');
var vhost = require('vhost')
var serveStatic = require('serve-static')
var morgan = require('morgan')

var app = connect()
app.use(morgan('dev'))
 
function handler(req, res, next) {
    console.log(req.vhost);
    res.send('your request site: ' + req.vhost.hostname)
}

var domain_sn = vhost('sn.cn', handler)

var domain_vra = vhost('vra.cn', handler)

app.use(domain_sn)//使用中间件
app.use(domain_vra)
 
app.listen(3000)