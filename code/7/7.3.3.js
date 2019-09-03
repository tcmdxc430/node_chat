var connect = require('connect');
var morgan = require('morgan')
var errorhandler = require('errorhandler')

var app = connect()
.use(morgan('combined'))
.use(function(req,res,next) {
    setTimeout(function() {
        next(new Error('xcxcxcx'))
    }, 500);
})
.use(errorhandler())
.listen(3000)