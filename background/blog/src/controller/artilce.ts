/*
 * @Description: 文章控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
import * as articleModel from '../models/article';

// 获得文章页
export let getArticle = async (ctx: any) => {
    const { current, isPage } = getPage(ctx);

    const articleData = await articleModel.getArticles(current, 15, null, null, null, null, ctx.req.headers['user-agent'].toLowerCase());

    await renderArticle(isPage, ctx, articleData);
};

// 获得分类页
export let getCategory = async (ctx: any) => {
    const { current, isPage } = getPage(ctx);

    const articleData = await articleModel.getArticles(current, 15, null, ctx.params.id, null, null, ctx.req.headers['user-agent'].toLowerCase());

    await renderArticle(isPage, ctx, articleData);
};

// 获得标签
export let getTag = async (ctx: any) => {
    const { current, isPage } = getPage(ctx);

    const articleData = await articleModel.getArticles(current, 15, null, null, null, ctx.params.tag, ctx.req.headers['user-agent'].toLowerCase());

    await renderArticle(isPage, ctx, articleData);
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
    const { current, isPage } = getPage(ctx);

    const articleData = await articleModel.getArticles(current, 15, null, null, ctx.params.keyword, null, ctx.req.headers['user-agent'].toLowerCase());

    await renderArticle(isPage, ctx, articleData);
};

const renderArticle = async (isPage: boolean, ctx: any, articleData: any) => {

    if (isPage) {
        await ctx.render('article-page.art', {
            ...articleData.info,
        });
    } else {
        await ctx.render('article.art', {
            ...ctx.res.$initValue,
            ...articleData.info,
            common: {
                hasBanner: false
            }
        });
    }
};

const getPage = (ctx: any): any => {
    return {
        current: ctx.query.current ? ctx.query.current : 1,
        isPage: ctx.query.current ? true : false
    };
};
