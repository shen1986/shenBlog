/*
 * @Description: 程序入口
 * @Author: shenxf
 * @Date: 2019-03-25 20:59:21
 */
var express = require('express');
var app = express();
app.engine('art', require('express-art-template'));

app.use('/', express.static('./public/'))

app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});

app.listen(3000, function(err){
    console.log('服务已经启动！');
});