/*
 * @Description: 文章控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const articleDetailModel = require('../models/article');

// 获得文章页
exports.getArticle = async function (ctx) {
    await ctx.render("article.art", {
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        },
        article: {
            name: "aui",
            tags: ["art", "template", "nodejs"]
        }
    });
};

exports.getArticleDetail = async function (ctx) {
    console.log(ctx.params.id);
    var articleDetail = await articleDetailModel.getArticleDetail(ctx.params.id);
    console.log(articleDetail);
    await ctx.render("article-detail.art", {
        ...ctx.res.$initValue,
        ...articleDetail._info,
        common: {
            hasBanner: false
        }
    });
}