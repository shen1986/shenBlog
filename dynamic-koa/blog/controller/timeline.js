/*
 * @Description: 归档控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const timelineModel = require('../models/timeline');

// 获得归档页
exports.getTimeline = async function (ctx) {

    var timeline = await timelineModel.getTimeline();

    console.log(timeline);

    timeline.tlItems = [];
    timeline.items.forEach((item, index, arr) => {
        let colorArr = ['blue', 'red', 'green'];
        let timeStr = '';

        if (item.created_at != null) {
            timeStr = item.created_at.substring(0, item.created_at.lastIndexOf("-"));
        }
            
        if (index === 0 || timeStr != arr[index - 1].created_at.substring(0, arr[index - 1].created_at.lastIndexOf("-"))) {
            timeline.tlItems.push({
                type: 'time',
                key: timeStr
            });
            timeline.tlItems.push({
               type: 'item',
               id: item.id,
               color: colorArr[index % 3],
               title: item.title
            })
        }
        else {
            timeline.tlItems.push({
            type: 'item',
               id: item.id,
               color: colorArr[index % 3],
               title: item.title
            })
        }
    })

    console.log(timeline);

    await ctx.render("timeline.art", {
        ...timeline,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};