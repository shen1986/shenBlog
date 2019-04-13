/*
 * @Description: 路由模块
 * @Author: shenxf
 * @Date: 2019-03-26 16:42:37
 */
var Router = require('koa-router');
var index = require('../controller/index');
var article = require('../controller/article');
var timeline = require('../controller/timeline');
var gather = require('../controller/gather');
var gossip = require('../controller/gossip');
const dbAccess = require('../models/dbAccess');

var router = new Router();

// 初始窗口给res绑定$initValue
router.use(dbAccess.initWindow);

// 首页
router.get('/', index.getHome);
router.get('/home', index.getHome);

// 文章页
router.get('/article', article.getArticle);
// 分类
router.get('/category/:id', article.getCategory);
// 标签
router.get('/tag/:tag', article.getTag);

// 文章页详细
router.get('/article-detail/:id', article.getArticleDetail);

// 归档
router.get('/timeline', timeline.getTimeline);

// 点滴
router.get('/gather', gather.getGather);

// 慢生活
router.get('/gossip', gossip.getGossip);

// 404 页面
router.use(async function (ctx) {
    ctx.render('404.art');
});

module.exports = router;