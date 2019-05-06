import * as userModel from '../models/userModel';
import * as Token from '../models/token';

export let toLogin = async function (ctx: any) {
    const {
        userid,
        password
    } = ctx.request.body;

    try {
        const passwordFromDb: any = await userModel.getPassword(userid);

        if (passwordFromDb.length !== 0 && password === passwordFromDb[0]['password']) {
            ctx.session.userid = userid;
            const token = Token.addToken(ctx.request.body);
            ctx.body = {
                'status': 1,
                'token': token
            };
        } else {
            ctx.body = {
                'status': 0,
                'message': '用户名或则密码错误'
            };
        }
    } catch (error) {
        ctx.body = {
            'status': 0,
            'message': error.message
        };
    }
};

/**
 * @description: 验证token
 * @param {any} ctx - koa上下文
 * @param {any} next - 下一个处理
 */
export let checkToken = async (ctx: any, next: any) => {
    const token = ctx.request.header.authorization;
    if (token) {
        //  获取到token
        const res: any = Token.decoded(token);
        console.log(res);
        const data: any = new Date();
        if (res && res.exp <= data / 1000) {
            ctx.body = {
                message: 'token过期',
                code: 3
            };
        } else {
            // 解析成功,验证信息
            const passwordFromDb: any = await userModel.getPassword(res.userid);
            if (passwordFromDb.length !== 0 && res.password === passwordFromDb[0]['password']) {
                await next();
            } else {
                ctx.body = {
                    message: 'token不对',
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
};

export let test = async function (ctx: any) {
    ctx.body = {
        'status': 1
    };
};