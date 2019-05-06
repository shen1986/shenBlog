/**
 * @Description: 主路由
 * @Author: shenxf
 * @Date: 2019-05-06 20:21:16
 */
import Router from 'koa-router';
import * as user from '../controller/user';
import * as index from '../controller/index';

const router = new Router();

// 进入主界面
router.get('/', index.goIndex);
// 登录处理
router.post('/toLogin', user.toLogin);

// 验证token
router.use(user.checkToken);


router.post('/test', user.test);

router.get('/get-articles', async (ctx: any) => {
    ctx.body = {
        message: 'very good'
    };
});

export default router;