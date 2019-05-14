"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @Description: 主路由
 * @Author: shenxf
 * @Date: 2019-05-06 20:21:16
 */
const koa_router_1 = __importDefault(require("koa-router"));
const user_1 = __importDefault(require("../controller/user"));
const index_1 = __importDefault(require("../controller/index"));
const article_1 = __importDefault(require("../controller/article"));
const category_1 = __importDefault(require("../controller/category"));
const gather_1 = __importDefault(require("../controller/gather"));
const gossip_1 = __importDefault(require("../controller/gossip"));
const router = new koa_router_1.default();
// 进入主界面
router.get('/', index_1.default.goIndex);
// 登录处理
router.post('/toLogin', user_1.default.toLogin);
// 验证token 在这个中间件以下的路由，必须验证token通过才能访问。
router.use(user_1.default.checkToken);
// 获取文章列表
router.get('/get-articles', article_1.default.getArticles);
// 删除文章
router.get('/article-delete/:id', article_1.default.delArticle);
// 根据id过去某个文章
router.get('/article/:id', article_1.default.findArticle);
// 更新或则追加文章
router.post('/article-submit', article_1.default.submitArticle);
// 取得分类
router.get('/get-categories', category_1.default.getCategories);
// 取得收藏
router.get('/get-gather', gather_1.default.getGather);
// 删除收藏
router.get('/gather-delete/:id', gather_1.default.delGather);
// 取得某条收藏
router.get('/gather/:id', gather_1.default.findGather);
// 更新或则追加收藏
router.post('/gather-submit', gather_1.default.submitGather);
router.get('/get-gossip', gossip_1.default.getGossip);
router.get('/gossip-delete/:id', gossip_1.default.delGossip);
router.get('/gossip/:id', gossip_1.default.findGossip);
router.post('/gossip-submit', gossip_1.default.submitGossip);
exports.default = router;
