import Koa from 'koa';
import router from './routes/router';

const app = new Koa();

// 统一异常处理
app.on('error', async (err, ctx) => {
    console.log(err.message);
});

// 导入路由
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('服务已经启动！监听端口：3000');
});