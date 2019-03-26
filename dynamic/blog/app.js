/*
 * @Description: 程序主入口
 * @Author: shenxf
 * @Date: 2019-03-25 20:59:21
 */
var express = require('express');

var app = express();

// 配置模板引擎
app.engine('art', require('express-art-template'));

// 配置静态路由
app.use('/', express.static('./public/'))

app.get('/', function (req, res) {
    res.render('index.art', {
        common: {
            hasBanner: true,
        },
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});

app.get('/article', function (req, res) {
    res.render('article.art', {
        common: {
            hasBanner: false,
        },
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});

app.listen(3000, function(err){
    console.log('服务已经启动！监听端口：3000');
});