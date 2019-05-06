import Router from 'koa-router';
import * as user from '../controller/user';

const router = new Router();

// 登录处理
router.post('/toLogin', user.toLogin);

// 验证token
router.use(user.checkToken);

router.post('/test', user.test);

export default router;