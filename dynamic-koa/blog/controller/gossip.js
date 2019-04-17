/*
 * @Description: 慢生活控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:15:13
 */
const gossipModel = require('../models/gossip');

/**
 * 慢生活首页
 */
exports.getGossip = async function (ctx) {

    var gossip = await gossipModel.getGossip();

    delete gossip.status;

    await ctx.render("gossip.art", {
        ...gossip,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};