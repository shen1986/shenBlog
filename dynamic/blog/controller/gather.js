/*
 * @Description: 点滴控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */

// 获得点滴页
exports.getGather = function (req, res) {
    res.render('gather.art', {
        common: {
            hasBanner: false,
        },
        gather: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
};