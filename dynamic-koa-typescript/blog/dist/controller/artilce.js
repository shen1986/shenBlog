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
exports.getArticle = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleData = yield articleModel.getArticles(null, 15, 1, null, null, null, ctx.req.headers['user-agent'].toLowerCase());
        yield ctx.render('article.art', Object.assign({}, articleData, ctx.res.$initValue, { common: {
                hasBanner: false
            } }));
    });
};
// 获得分类页
exports.getCategory = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleData = yield articleModel.getArticles(1, 15, null, ctx.params.id, null, null, ctx.req.headers['user-agent'].toLowerCase());
        yield ctx.render('article.art', Object.assign({}, articleData, ctx.res.$initValue, { common: {
                hasBanner: false
            } }));
    });
};
// 获得标签
exports.getTag = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleData = yield articleModel.getArticles(1, 15, null, null, null, ctx.params.tag, ctx.req.headers['user-agent'].toLowerCase());
        yield ctx.render('article.art', Object.assign({}, articleData, ctx.res.$initValue, { common: {
                hasBanner: false
            } }));
    });
};
exports.getArticleDetail = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleDetail = yield articleModel.getArticleDetail(ctx.params.id);
        yield ctx.render('article-detail.art', Object.assign({}, ctx.res.$initValue, articleDetail._info, { common: {
                hasBanner: false
            } }));
    });
};
//# sourceMappingURL=artilce.js.map