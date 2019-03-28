/*
 * @Description: 慢生活控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:15:13
 */

// 慢生活首页
exports.getGossip = function (req, res) {
    res.render('gossip.art', {
        common: {
            hasBanner: false,
        },
        gossip: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
};