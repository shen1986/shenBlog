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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const Token = __importStar(require("../common/utils/token"));
const crypto = __importStar(require("../common/utils/crypto"));
class User {
    constructor() {
        /**
         * @description: 登录处理
         * @param {any} ctx - koa上下文
         */
        this.toLogin = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const { userid, password } = ctx.request.body;
            try {
                const userModel = new userModel_1.default();
                const passwordFromDb = yield userModel.getPassword(userid);
                if (passwordFromDb.length !== 0 && crypto.sha256(crypto.sha256(password)) === passwordFromDb[0]['password']) {
                    const token = Token.addToken(ctx.request.body);
                    ctx.body = {
                        'status': 1,
                        'token': token
                    };
                }
                else {
                    ctx.body = {
                        'status': 0,
                        'msg': '用户名或则密码错误'
                    };
                }
            }
            catch (error) {
                ctx.body = {
                    'status': 0,
                    'msg': error.message
                };
            }
        });
        /**
         * @description: 验证token
         * @param {any} ctx - koa上下文
         * @param {any} next - 下一个处理
         */
        this.checkToken = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            const token = ctx.request.header.authorization;
            if (token) {
                //  获取到token
                const res = Token.decoded(token);
                const data = new Date();
                if (res && res.exp <= data / 1000) {
                    ctx.body = {
                        msg: 'token过期',
                        code: 3
                    };
                }
                else {
                    // 解析成功,验证信息
                    const userModel = new userModel_1.default();
                    const passwordFromDb = yield userModel.getPassword(res.userid);
                    if (passwordFromDb.length !== 0 &&
                        crypto.sha256(crypto.sha256(res.password)) === passwordFromDb[0]['password']) {
                        yield next();
                    }
                    else {
                        ctx.body = {
                            msg: 'token不对',
                            code: 2
                        };
                    }
                }
            }
            else { // 没有取到token
                ctx.body = {
                    msg: '没有token',
                    code: 0
                };
            }
        });
    }
}
exports.default = new User();
