var express = require("express");

var app = express();

//静态服务
app.use("/",express.static(__dirname + "/new"));

//新的路由
app.get("/images",function(req,res){
    res.send("hah");
});

//会自动识别err参数，如果有，那么就这个函数能捕获err
app.use(function(req,res){
    res.status(404).send("nnnnn");
});

app.listen(3000);

