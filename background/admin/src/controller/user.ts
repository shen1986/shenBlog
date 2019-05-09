import UserModel from '../models/userModel';
import * as Token from '../common/utils/token';
import * as crypto from '../common/utils/crypto';

class User {

    /**
     * @description: 登录处理
     * @param {any} ctx - koa上下文
     */
    public toLogin = async (ctx: any): Promise<void> => {
        const {
            userid,
            password
        } = ctx.request.body;
        try {
            const userModel = new UserModel();
            const passwordFromDb: any = await userModel.getPassword(userid);
            if (passwordFromDb.length !== 0 && crypto.sha256(crypto.sha256(password)) === passwordFromDb[0]['password']) {
                const token = Token.addToken(ctx.request.body);
                ctx.body = {
                    'status': 1,
                    'token': token
                };
            } else {
                ctx.body = {
                    'status': 0,
                    'msg': '用户名或则密码错误'
                };
            }
        } catch (error) {
            ctx.body = {
                'status': 0,
                'msg': error.message
            };
        }
    }

    /**
     * @description: 验证token
     * @param {any} ctx - koa上下文
     * @param {any} next - 下一个处理
     */
    public checkToken = async (ctx: any, next: any): Promise<void> => {
        const token = ctx.request.header.authorization;
        if (token) {
            //  获取到token
            const res: any = Token.decoded(token);
            const data: any = new Date();
            if (res && res.exp <= data / 1000) {
                ctx.body = {
                    msg: 'token过期',
                    code: 3
                };
            } else {
                // 解析成功,验证信息
                const userModel = new UserModel();
                const passwordFromDb: any = await userModel.getPassword(res.userid);
                if (passwordFromDb.length !== 0 &&
                    crypto.sha256(crypto.sha256(res.password)) === passwordFromDb[0]['password']) {
                    await next();
                } else {
                    ctx.body = {
                        msg: 'token不对',
                        code: 2
                    };
                }
            }
        } else {  // 没有取到token
            ctx.body = {
                msg: '没有token',
                code: 0
            };
        }
    }
}

export default new User();