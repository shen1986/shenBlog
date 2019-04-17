/*
 * @Description: 文章控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const articleDetailModel = require('../models/article');
const articleModel = require('../models/article');

/**
 * 获得文章页
 */
exports.getArticle = async function (ctx) {
    var articleData = null;

    try {
        articleData =  await articleModel.getArticles(null, 15, 1, null, null, null, ctx.req.headers["user-agent"].toLowerCase());
    } catch (error) {
        ctx.throw(500, '系统异常', error);
    }

    await ctx.render("article.art", {
        ...articleData,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};

/**
 * 获得分类页
 */
exports.getCategory = async function(ctx) {
    var articleData = null;

    try {
        articleData =  await articleModel.getArticles(1, 15, null, ctx.params.id, null, null, ctx.req.headers["user-agent"].toLowerCase());
    } catch (error) {
        ctx.throw(500, '系统异常', error);
    }

    await ctx.render("article.art", {
        ...articleData,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
}

/**
 * 获得标签
 */
exports.getTag = async function(ctx) {
    var articleData = null;

    try {
        articleData =  await articleModel.getArticles(1, 15, null, null, null, ctx.params.tag, ctx.req.headers["user-agent"].toLowerCase());
    } catch (error) {
        ctx.throw(500, '系统异常', error);
    }

    await ctx.render("article.art", {
        ...articleData,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
}

/**
 * 文章详细
 */
exports.getArticleDetail = async function (ctx) {
    var articleDetail = null;

    try {
        articleDetail = await articleDetailModel.getArticleDetail(ctx.params.id);
    } catch (error) {
        ctx.throw(500, '系统异常', error);
    }

    await ctx.render("article-detail.art", {
        ...ctx.res.$initValue,
        ...articleDetail._info,
        common: {
            hasBanner: false
        }
    });
}