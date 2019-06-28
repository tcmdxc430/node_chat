var connect = require('connect')
var url = require('url')
var rewrite = require('./middleware/rewrite');
var showPost = require('./middleware/showPost');

var app = connect().use(rewrite()).use(showPost).listen(3000)