/**
 * favicon中间件
 */

var connect = require('connect');
var favicon = require('serve-favicon')
var morgan = require('morgan')

var app = connect()
app.use(favicon(__dirname + '/favicon.ico'))
app.use(morgan('dev'))
app.use(function(req,res) {
    res.end('hahhahaha')
}).listen(3000)