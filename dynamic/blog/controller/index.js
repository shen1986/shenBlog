/*
 * @Description: 首页控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:15:13
 */

// 获得首页
exports.getHome = function (req, res) {
    res.render('index.art', {
        common: {
            banner: true,
        },
        index: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
};