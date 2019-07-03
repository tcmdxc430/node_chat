var connect = require('connect');
// var contentType = require('content-type')
var bodyParser = require('body-parser');
var getRawBody = require('raw-body');

var app = connect()
// .use(connect.limit('32kb'))
app.use(function (req, res, next) {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '10mb',
    //   encoding: contentType.parse(req).parameters.charset
    })
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000);
