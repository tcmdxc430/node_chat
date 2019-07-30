/**
 * 网页浏览计数器,并用session控制过期时间等
 */
var connect = require('connect');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser');
var session = require('express-session')
var redisStore = require('connect-redis')(session)

var app = connect()
  .use(favicon(__dirname + '/favicon.ico'))
  .use(cookieParser('keyboard cat'))
  .use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // path: '/',
      // httpOnly: true,
      maxAge: 6 * 1000   // e.g. 1 year
    },
    store:new redisStore({prefix:'sid'})
  }))
  .use(function(req, res, next){
    console.log(req.session)
    var sess = req.session;
    
    if (sess.views) {
      res.setHeader('Content-Type', 'text/html');
      // 计数
      res.write('<p>views: ' + sess.views + '</p>');
      // 剩余失效时间
      res.write('<p>expires in: ' + (sess.cookie.maxAge/1000) + 's</p>');
      // httpOnly可以防止客户端脚本访问cookie数据
      res.write('<p>httpOnly: ' + sess.cookie.httpOnly+ '</p>');
      // 按路径限制cookie作用于
      res.write('<p>path: ' + sess.cookie.path+ '</p>');
      // 按域名限制cookie作用于
      res.write('<p>domain: ' + sess.cookie.domain+ '</p>');
      // 按安全连接限制cookie作用于
      res.write('<p>secure: ' + sess.cookie.secure+ '</p>');
      sess.views++;
      res.end();
    } else {
      sess.views = 1;
      res.end('welcome to the session demo. refresh!');
    }
  });

app.listen(3000);
