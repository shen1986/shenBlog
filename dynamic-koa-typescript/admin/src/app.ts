import Koa from 'koa';
import router from './routes/router';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

// session配置
app.keys = ['shenxf1986@qq.com'];

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

app.listen(8080, () => {
    console.log('服务已经启动！监听端口：8080');
});