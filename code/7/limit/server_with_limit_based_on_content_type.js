// 根据请求的Content-Type限制主体大小
var connect = require('connect');
var bodyParser = require('body-parser');
var getRawBody = require('raw-body');

function type(type, fn) {
  return function (req, res, next) {
    var ct = req.headers['content-type'] || '';
    if (0 != ct.indexOf(type)) {
      return next();
    }
    fn(req, res, next);
  }
}

var app = connect()
  .use(type('application/x-www-form-urlencoded', function (req, res, next) {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '64kb',
      //   encoding: contentType.parse(req).parameters.charset
    })
  }))
  .use(type('application/json', function (req, res, next) {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '32kb',
      //   encoding: contentType.parse(req).parameters.charset
    })
  }))
  .use(type('image', function (req, res, next) {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '2mb',
      //   encoding: contentType.parse(req).parameters.charset
    })
  }))
  .use(type('video', function (req, res, next) {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '300mb',
      //   encoding: contentType.parse(req).parameters.charset
    })
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000);
