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
/*
 * @Description: 程序主入口
 * @Author: shenxf
 * @Date: 2019-03-25 20:59:21
 */
const router_1 = __importDefault(require("./routes/router"));
const path_1 = __importDefault(require("path"));
const koa_1 = __importDefault(require("koa"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const config_1 = __importDefault(require("./common/config/config"));
const app = new koa_1.default();
// 配置模板引擎
const render = require('koa-art-template');
// 这是默认设置,需要设置其他的路径可以在这设置
render(app, {
    root: path_1.default.join(__dirname, 'views'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});
// 配置静态资源
app.use(koa_static_1.default(path_1.default.join(__dirname, './public/')));
// 引入bodyParse
app.use(koa_bodyparser_1.default());
// 统一异常处理
app.on('error', (err, ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log(err.message);
}));
// 配置404页面
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    yield next();
    if (ctx.res.statusCode === 404) {
        yield ctx.render('404.art');
    }
}));
// 导入路由
app
    .use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
app.listen(config_1.default.port, () => {
    console.log(`服务已经启动！监听端口：${config_1.default.port}`);
});
