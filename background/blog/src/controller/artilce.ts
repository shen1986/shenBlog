/*
 * @Description: 文章控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
import * as articleModel from '../models/article';

// 获得文章页
export let getArticle = async (ctx: any) => {
    const current = ctx.query.current ? ctx.query.current : 1;
    let isPage = false;
    if (ctx.query.current) {
        isPage = true;
    }
    const articleData = await articleModel.getArticles(current, 15, null, null, null, null, ctx.req.headers['user-agent'].toLowerCase());

    if (isPage) {
        await ctx.render('article-page.art', {
            ...articleData.info,
        });
    } else {
        await ctx.render('article.art', {
            ...articleData.info,
            ...ctx.res.$initValue,
            common: {
                hasBanner: false
            }
        });
    }

};

// 获得分类页
export let getCategory = async (ctx: any) => {

    const articleData = await articleModel.getArticles(1, 15, null, ctx.params.id, null, null, ctx.req.headers['user-agent'].toLowerCase());

    await ctx.render('article.art', {
        ...articleData.info,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};

// 获得标签
export let getTag = async (ctx: any) => {

    const articleData = await articleModel.getArticles(1, 15, null, null, null, ctx.params.tag, ctx.req.headers['user-agent'].toLowerCase());

    await ctx.render('article.art', {
        ...articleData.info,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};

// 获得文章详细
export let getArticleDetail = async (ctx: any) => {

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
export let getSearch = async ( ctx: any ) => {
    const articleData = await articleModel.getArticles(1, 15, null, null, ctx.params.keyword, null, ctx.req.headers['user-agent'].toLowerCase());

    await ctx.render('article.art', {
        ...articleData.info,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};