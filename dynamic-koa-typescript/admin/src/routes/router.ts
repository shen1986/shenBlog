import Router from 'koa-router';

const router = new Router();

// // 初始窗口给res绑定$initValue
// router.use(dbAccess.initWindow);

// // 首页
// router.get('/', index.getHome);
// router.get('/home', index.getHome);

// // 文章页
// router.get('/article', article.getArticle);
// // 分类
// router.get('/category/:id', article.getCategory);
// // 标签
// router.get('/tag/:tag', article.getTag);
// // 检索功能
// router.get('/search/:keyword', article.getSearch);

// // 文章页详细
// router.get('/article-detail/:id', article.getArticleDetail);

// // 归档
// router.get('/timeline', timeline.getTimeline);
// router.get('/get-timeline', timeline.getTimelinebySel);

// // 点滴
// router.get('/gather', gather.getGather);

// // 慢生活
// router.get('/gossip', gossip.getGossip);

export default router;