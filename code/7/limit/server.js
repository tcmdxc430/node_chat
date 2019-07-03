/**
 * 如何把一个脆弱的服务器废掉
 */
var connect = require('connect');
var bodyParser = require('body-parser');

var app = connect()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.listen(3000);
