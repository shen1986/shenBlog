/*
 * @Description: 程序主入口
 * @Author: shenxf
 * @Date: 2019-03-25 20:59:21
 */
import router from './routes/router';
import path from 'path';
import Koa from 'koa';
import kStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import config from './common/config/config';
import compress from 'koa-compress';
// https 支持
import http from 'http';
import https from 'https';
import enforceHttps from 'koa-sslify';
import fs from 'fs';

const app = new Koa();

let options = {};

if (process.env.NODE_ENV !== 'development') {
    // 强制开启https
    app.use(enforceHttps());

    options = {
        key: fs.readFileSync(path.join(__dirname, './ssl/2255319_www.shenxf.com.key')),  // ssl文件路径
        cert: fs.readFileSync(path.join(__dirname, './ssl/2255319_www.shenxf.com.pem'))  // ssl文件路径
    };
}

// 开启 Gzip
app.use(compress({
  filter: function (content_type: string) {
    // return /text/i.test(content_type); 我没文化，服务器差，默认开启Gzip。
    return true;
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

// 配置模板引擎
const render = require('koa-art-template');

// 这是默认设置,需要设置其他的路径可以在这设置
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});

// 配置静态资源
app.use(kStatic(
    path.join(__dirname, './public/')
));

// 引入bodyParse
app.use(bodyParser());

// 统一异常处理
app.on('error', async (err, ctx) => {
    console.log(err.message);
});

// 配置404页面
app.use(async (ctx, next) => {
    await next();

    if (ctx.res.statusCode === 404) {
        await ctx.render('404.art');
    }
});

// 导入路由
app
    .use(router.routes())
    .use(router.allowedMethods());

if (process.env.NODE_ENV !== 'development') {
    // 启动服务
    https.createServer(options, app.callback()).listen(config.port);

    // 打印成功
    console.log('https server is running');
} else {
    app.listen(config.port, () => {
        console.log(`服务已经启动！监听端口：${config.port}`);
    });
}
