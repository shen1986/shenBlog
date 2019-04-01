/*
 * @Description: 程序主入口
 * @Author: shenxf
 * @Date: 2019-03-25 20:59:21
 */
var express = require('express');
var router = require('./routes/router');
var path = require('path');

var app = express();

// 配置模板引擎
app.engine('art', require('express-art-template'));


console.log(path.join(__dirname, './views/'));
//这是默认设置,需要设置其他的路径可以在这设置
app.set('views', path.join(__dirname, './views/'));

// 配置静态路由
app.use(express.static(path.join(__dirname,'./public/')));

// 导入路由
app.use(router);

app.listen(3000, function(err){
    console.log('服务已经启动！监听端口：3000');
});