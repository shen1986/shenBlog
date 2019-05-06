import Router from 'koa-router';
import * as user from '../controller/user';

const router = new Router();

// 登录处理
router.post('/toLogin', user.toLogin);

export default router;