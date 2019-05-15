"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
 * @Description: 文章控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const articleModel = __importStar(require("../models/article"));
// 获得文章页
exports.getArticle = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { current, isPage } = getPage(ctx);
    const articleData = yield articleModel.getArticles(current, 15, null, null, null, null, ctx.req.headers['user-agent'].toLowerCase());
    yield renderArticle(isPage, ctx, articleData);
});
// 获得分类页
exports.getCategory = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { current, isPage } = getPage(ctx);
    const articleData = yield articleModel.getArticles(current, 15, null, ctx.params.id, null, null, ctx.req.headers['user-agent'].toLowerCase());
    yield renderArticle(isPage, ctx, articleData);
});
// 获得标签
exports.getTag = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { current, isPage } = getPage(ctx);
    const articleData = yield articleModel.getArticles(current, 15, null, null, null, ctx.params.tag, ctx.req.headers['user-agent'].toLowerCase());
    yield renderArticle(isPage, ctx, articleData);
});
// 获得文章详细
exports.getArticleDetail = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const articleDetail = yield articleModel.getArticleDetail(ctx.params.id);
    yield ctx.render('article-detail.art', Object.assign({}, ctx.res.$initValue, articleDetail._info, { common: {
            hasBanner: false
        } }));
});
// 检索功能
exports.getSearch = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { current, isPage } = getPage(ctx);
    const articleData = yield articleModel.getArticles(current, 15, null, null, ctx.params.keyword, null, ctx.req.headers['user-agent'].toLowerCase());
    yield renderArticle(isPage, ctx, articleData);
});
const renderArticle = (isPage, ctx, articleData) => __awaiter(this, void 0, void 0, function* () {
    if (isPage) {
        yield ctx.render('article-page.art', Object.assign({}, articleData.info));
    }
    else {
        yield ctx.render('article.art', Object.assign({}, articleData.info, ctx.res.$initValue, { common: {
                hasBanner: false
            } }));
    }
});
const getPage = (ctx) => {
    return {
        current: ctx.query.current ? ctx.query.current : 1,
        isPage: ctx.query.current ? true : false
    };
};
