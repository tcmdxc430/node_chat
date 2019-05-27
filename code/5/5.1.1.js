var http = require('http')
var counter = 0

 http.createServer(function(req,res) {
    counter++
    console.log('+1')
    res.write(`${counter} times`)
    res.end()
}).listen(3000)