var connect = require('connect');
var express = require('express')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var basicAuth = require('basic-auth-connect');
var csrf = require('csurf');

var csrfProtection = csrf({cookie:true})
var parseForm = bodyParser.urlencoded({extended:false});

    // 创建epxress app
var app = express();
// app.dynamicHelpers({
//     csrf: csrf.token
// });
// router.get('/user/signup',function(req,res,next){
//     res.render('user/signup',{
//         csrfToken: req.csrfToken()
//     });
// });

function form(req, res, next) {

    // 显示为html
    res.setHeader('Content-Type', 'text/html');
    res.write(`<form action="/process" method="POST">
    <input type="hidden" name="_csrf" value="<%= csrftoken %>">
    
    Favorite color: <input type="text" name="favoriteColor">
    <button type="submit">Submit</button>
</form>`)
    res.end();
}

// var app = connect();
app.use(parseForm);
app.use(cookieParser('coin is coin'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // path: '/',
        // httpOnly: true,
        maxAge: 6 * 1000   // e.g. 1 year
    },
}))
// app.use(require('csurf')())
app.use(csrfProtection)
app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.locals.csrftoken = req.csrfToken();
    console.log(res.locals.csrftoken)
    next();
  });
app.get('/form', csrfProtection, function (req, res) {
    console.log(req.csrfToken())
    // 把 csrfToken 传递给视图
    res.render('send', { csrfToken: req.csrfToken() })
})

app.post('/process', parseForm, csrfProtection, function (req, res) {
    console.log(parseForm)
    res.send('data is being processed')
})
app.use(form)

// app.use(basicAuth('dxc','332211'))
// app.use(function(req,res){
//     res.end('welcome')
// })

app.listen(3000);