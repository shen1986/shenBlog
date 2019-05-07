/*
 * @Description: 首页控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:15:13
 */
import * as articleModel from '../models/article';

// 获得首页
export let getHome = async (ctx: any, next: any) => {
    const renderData = await getArt(ctx);
    await ctx.render('index.art', renderData);
};

const getArt = async function (ctx: any) {
    const articleData = await articleModel.getArticles(null, 15, 1, null, null, null, ctx.req.headers['user-agent'].toLowerCase());

    const renderData = {
        ...ctx.res.$initValue,
        ...articleData.info,
        common: {
            banner: true // 显示轮播图
        }
    };

    return renderData;
};
