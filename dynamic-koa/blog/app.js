/*
 * @Description: 程序主入口
 * @Author: shenxf
 * @Date: 2019-03-25 20:59:21
 */
var router = require('./routes/router');
var path = require('path');
const Koa = require('koa');
const static = require('koa-static')   //静态资源服务插件
const mongoose = require('mongoose');
const fs = require('fs');

const db = 'mongodb://www.shenxf.com/blog';

/* 连接数据库 */
mongoose.Promise = require('bluebird');
mongoose.connect(db, { useMongoClient: true });

/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, 'models');

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
let walk = function (modelPath) {
    fs.readdirSync(modelPath).forEach(function (file) {
        let filePath = path.join(modelPath, '/' + file)
        let stat = fs.statSync(filePath)

        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(filePath)
            }
        } else if (stat.isDirectory()) {
            walk(filePath)
        }
    })
};
walk(models_path);

const app = new Koa();

// 配置模板引擎
const render = require('koa-art-template');

//这是默认设置,需要设置其他的路径可以在这设置
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
  });

// 配置静态资源
app.use(static(
    path.join( __dirname, './public/')
));

// 导入路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, function(err){
    console.log('服务已经启动！监听端口：3000');
});