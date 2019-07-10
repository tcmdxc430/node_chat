/**
 * qs解析url为对象
 */
// curl "http://localhost:3000/song-Search?me=hah%20tt&oid=89"
var connect = require('connect')
var qs = require('qs');

var app = connect()
// app.use(connect.query())
.use(function(req,res,next) {
    // console.log(req)
    res.setHeader('Coneten-Type','application/json')
    // qs.parse()将URL解析成对象的形式
    var end_url = qs.parse(req._parsedUrl.query)
    console.log(JSON.stringify(end_url))
    res.end(JSON.stringify(end_url))
}).listen(3000)