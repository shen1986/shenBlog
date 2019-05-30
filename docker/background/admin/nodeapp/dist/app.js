"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @Description: 程序主入口
 * @Author: shenxf
 * @Date: 2019-05-06 20:21:16
 */
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("./routes/router"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./common/config/config"));
const https_1 = __importDefault(require("https"));
const koa_sslify_1 = __importDefault(require("koa-sslify"));
const fs_1 = __importDefault(require("fs"));
const app = new koa_1.default();
let options = {};
if (process.env.NODE_ENV !== 'development') {
    // 强制开启https
    app.use(koa_sslify_1.default());
    options = {
        key: fs_1.default.readFileSync(path_1.default.join(__dirname, './ssl/2255319_www.shenxf.com.key')),
        cert: fs_1.default.readFileSync(path_1.default.join(__dirname, './ssl/2255319_www.shenxf.com.pem')) // ssl文件路径
    };
}
// 配置静态资源
app.use(koa_static_1.default(path_1.default.join(__dirname, './public/')));
// 这是处理前端跨域的配置
app.use(koa2_cors_1.default({
    origin: function (ctx) {
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
app.keys = [config_1.default.sessionKey];
// 详细配置
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false,
};
// 导入session
app.use(koa_session_1.default(CONFIG, app));
// 导入bodyParser用来解析post的值
app.use(koa_bodyparser_1.default());
// 统一异常处理
app.on('error', (err, ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log(err.message);
}));
// 导入路由
app
    .use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
if (process.env.NODE_ENV !== 'development') {
    // 启动服务
    https_1.default.createServer(options, app.callback()).listen(config_1.default.port);
    // 打印成功
    console.log('https server is running');
}
else {
    app.listen(config_1.default.port, () => {
        console.log(`服务已经启动！监听端口：${config_1.default.port}`);
    });
}
