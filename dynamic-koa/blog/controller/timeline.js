/*
 * @Description: 归档控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const timelineModel = require('../models/timeline');

// 获得归档页
exports.getTimeline = async function (ctx) {

    var timeline = await timelineModel.getTimeline();

    await ctx.render("timeline.art", {
        ...timeline,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};