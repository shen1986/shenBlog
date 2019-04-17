/*
 * @Description: 归档控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
import * as timelineModel from '../models/timeline';

// 获得归档页
export let getTimeline = async function (ctx: any) {

    let timeline: any = await timelineModel.getTimeline();

    timeline = PreperTimeline(timeline);

    await ctx.render('timeline.art', {
        ...timeline,
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};

export let getTimelinebySel = async function (ctx: any) {
    let timeline: any = await timelineModel.getTimeline( ctx.query.current, ctx.query.count, ctx.query.category );

    timeline = PreperTimeline(timeline);

    await ctx.render('timeline-sel.art', {
        ...timeline,
    });
};

const PreperTimeline = function( timeline: any) {
    timeline.tlItems = [];
    timeline.items.forEach((item: any, index: number, arr: any) => {
        const colorArr = ['blue', 'red', 'green'];
        let timeStr = '';

        if (item.created_at != null) {
            timeStr = item.created_at.substring(0, item.created_at.lastIndexOf('-'));
        }

        if (index === 0 || timeStr != arr[index - 1].created_at.substring(0, arr[index - 1].created_at.lastIndexOf('-'))) {
            timeline.tlItems.push({
                type: 'time',
                key: timeStr
            });
            timeline.tlItems.push({
                type: 'item',
                id: item.id,
                color: colorArr[index % 3],
                title: item.title
            });
        }
        else {
            timeline.tlItems.push({
                type: 'item',
                id: item.id,
                color: colorArr[index % 3],
                title: item.title
            });
        }
    });

    return timeline;
};