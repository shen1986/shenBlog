/**
 * @Description: 程序主入口
 * @Author: shenxf
 * @Date: 2019-05-06 20:21:16
 */
import Koa from 'koa';
import router from './routes/router';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import kStatic from 'koa-static';
import path from 'path';
import config from './common/config/config';

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

// 配置静态资源
app.use(kStatic(
    path.join(__dirname, './public/')
));

// 这是处理前端跨域的配置
app.use(cors({
    origin: function (ctx: any) {
        if (ctx.url === '/toLogin') {
            return '*'; // 允许来自所有域名请求
        }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// session配置
app.keys = [config.sessionKey];

// 详细配置
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000, // 这个是确定cookie的有效期，默认是一天
    autoCommit: true,
    overwrite: true,
    httpOnly: true, // 表示是否可以通过javascript来修改，设成true会更加安全
    signed: true,
    rolling: true, // 每次使用的时候更新session的有效时间
    renew: false,
};

// 导入session
app.use(session(CONFIG, app));

// 导入bodyParser用来解析post的值
app.use(bodyParser());

// 统一异常处理
app.on('error', async (err, ctx) => {
    console.log(err.message);
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
