/*
 * @Description: 文章控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
import * as articleModel from '../models/article';

// 获得文章页
export let getArticle = async function (ctx: any) {
    const articleData = await articleModel.getArticles(null, 15, 1, null, null, null, ctx.req.headers['user-agent'].toLowerCase());

    await ctx.render('article.art', {
        ...articleData,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};

// 获得分类页
export let getCategory = async function (ctx: any) {

    const articleData = await articleModel.getArticles(1, 15, null, ctx.params.id, null, null, ctx.req.headers['user-agent'].toLowerCase());

    await ctx.render('article.art', {
        ...articleData,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};

// 获得标签
export let getTag = async function (ctx: any) {

    const articleData = await articleModel.getArticles(1, 15, null, null, null, ctx.params.tag, ctx.req.headers['user-agent'].toLowerCase());

    await ctx.render('article.art', {
        ...articleData,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};

// 获得文章详细
export let getArticleDetail = async function (ctx: any) {

    const articleDetail = await articleModel.getArticleDetail(ctx.params.id);

    await ctx.render('article-detail.art', {
        ...ctx.res.$initValue,
        ...articleDetail._info,
        common: {
            hasBanner: false
        }
    });
};

// 检索功能
export let getSearch = async function( ctx: any ) {
    const articleData = await articleModel.getArticles(1, 15, null, null, ctx.params.keyword, null, ctx.req.headers['user-agent'].toLowerCase());

    await ctx.render('article.art', {
        ...articleData,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};