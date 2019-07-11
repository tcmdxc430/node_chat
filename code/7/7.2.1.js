/**
 * 定制日志
 */
// curl http://localhost:3000
var connect = require('connect');
var morgan = require('morgan')
var url = require('url')
var fs = require('fs')

var log = fs.createWriteStream('./myLog.log',{flags:'a'})
morgan.token('query-string',function(req,res) {
    return url.parse(req.url).query
})
var app = connect()
// morgan('combined')来替代logger
        //   .use(morgan('combined'))

        // 彩色输出
        // .use(morgan('dev'))

        // 定制日志输出格式
        // .use(morgan(':method :url :response-time ms'))

        // 自定义输出日志文件
        .use(morgan('combined',{stream:log}))
        // .use('/error',error)
        //   .use(hello)
          .listen(3000);
