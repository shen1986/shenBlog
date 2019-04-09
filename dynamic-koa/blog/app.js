/*
 * @Description: 程序主入口
 * @Author: shenxf
 * @Date: 2019-03-25 20:59:21
 */
const router = require("./routes/router");
const path = require("path");
const Koa = require('koa');
const static = require('koa-static'); //静态资源服务插件
const bodyParser = require("koa-bodyparser");

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

// 引入bodyParse
app.use(bodyParser());

// 导入路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, function(err){
    console.log('服务已经启动！监听端口：3000');
});