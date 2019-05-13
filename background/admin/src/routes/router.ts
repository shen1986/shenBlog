/**
 * @Description: 主路由
 * @Author: shenxf
 * @Date: 2019-05-06 20:21:16
 */
import Router from 'koa-router';
import user from '../controller/user';
import index from '../controller/index';
import article from '../controller/article';
import category from '../controller/category';
import gather from '../controller/gather';
import gossip from '../controller/gossip';

const router = new Router();

// 进入主界面
router.get('/', index.goIndex);

// 登录处理
router.post('/toLogin', user.toLogin);

// 验证token 在这个中间件以下的路由，必须验证token通过才能访问。
router.use(user.checkToken);

// 获取文章列表
router.get('/get-articles', article.getArticles);

// 删除文章
router.get('/article-delete/:id', article.delArticle);

// 根据id过去某个文章
router.get('/article/:id', article.findArticle);

// 更新或则追加文章
router.post('/article-submit', article.submitArticle);

// 取得分类
router.get('/get-categories', category.getCategories);

// 取得收藏
router.get('/get-gather', gather.getGather);

// 删除收藏
router.get('/gather-delete/:id', gather.delGather);

// 取得某条收藏
router.get('/gather/:id', gather.findGather);

// 更新或则追加收藏
router.post('/gather-submit', gather.submitGather);


router.get('/get-gossip', gossip.getGossip);

router.get('/gossip-delete/:id', gossip.delGossip);

router.get('/gossip/:id', gossip.findGossip);

router.post('/gossip-submit', gossip.submitGossip);

export default router;