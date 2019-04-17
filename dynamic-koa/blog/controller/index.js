/*
 * @Description: 首页控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:15:13
 */
const articleModel = require('../models/article');

/**
 * 获得首页
 */
exports.getHome = async (ctx, next) => {
    var renderData = await getArt(ctx);

    if (renderData.status == 0) {
        ctx.throw(500 , "数据异常", renderData);
    }

    await ctx.render("index.art", renderData);  
};

/**
 * 取得文章情报
 * @param {any} ctx - 上下文 
 */
var getArt = async function(ctx) {
    var articleData =  await articleModel.getArticles(null, 15, 1, null, null, null, ctx.req.headers["user-agent"].toLowerCase());
    
    // 错误时候直接返回错误信息
    if (articleData.status == 0) {
        return articleData;
    }

    var renderData = {
        ...ctx.res.$initValue,
        ...articleData.info,
        common: {
            banner: true // 显示轮播图
        }
    }

    return renderData;
}