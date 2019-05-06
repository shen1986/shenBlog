import * as userModel from '../models/userModel';

export let toLogin = async function (ctx: any) {
    const {
        userid,
        password
    } = ctx.request.body;

    try {
        const passwordFromDb: any = await userModel.getPassword(userid);

        if (passwordFromDb.length !== 0 && password === passwordFromDb[0]['password']) {
            ctx.session.userid = userid;
            ctx.body = {
                'status': 1
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