// method-override修改表单提交的谓词
var connect = require('connect');
var methodOverride = require('method-override')
var morgan = require('morgan')
var bodyParser = require('body-parser');

function edit(req, res, next) {

    if ('GET' != req.method) return next();
    res.setHeader('Content-Type', 'text/html');
    // action="?_method=PUT" 将put谓词填到_method插槽中
    res.write('<form method="post" action="?_method=PUT">');
    res.write('<input type="hidden"  value="put" />');
    res.write('<input type="text" name="user[name]" value="Tobi" />');
    res.write('<input type="submit" value="Update" />');
    res.write('</form>');
    res.end();
}

function update(req, res, next) {
    console.log(req.method)
    console.log(req.originalMethod)
    if ('PUT' != req.method) return next();
    res.end('Updated name to ' + req.body.user.name);
}

var app = connect()
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(methodOverride('_method'))
    .use(edit)
    .use(update)
    .listen(3000);
