"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: 路由模块
 * @Author: shenxf
 * @Date: 2019-03-26 16:42:37
 */
const koa_router_1 = __importDefault(require("koa-router"));
const index = __importStar(require("../controller/index"));
const article = __importStar(require("../controller/artilce"));
const timeline = __importStar(require("../controller/timeline"));
const gather = __importStar(require("../controller/gather"));
const gossip = __importStar(require("../controller/gossip"));
const dbAccess = __importStar(require("../models/dbAccess"));
const router = new koa_router_1.default();
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
// 检索功能
router.get('/search/:keyword', article.getSearch);
// 文章页详细
router.get('/article-detail/:id', article.getArticleDetail);
// 归档
router.get('/timeline', timeline.getTimeline);
router.get('/get-timeline', timeline.getTimelinebySel);
// 点滴
router.get('/gather', gather.getGather);
// 慢生活
router.get('/gossip', gossip.getGossip);
exports.default = router;
