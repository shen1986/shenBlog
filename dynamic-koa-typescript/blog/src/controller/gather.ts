/*
 * @Description: 点滴控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const gatherModel = require('../models/gather');
import * as Str from '../common/utils/string';

// 获得点滴页
export let getGather = async function (ctx: any, next: any) {
    const notes = await gatherModel.getNotes();
    if (notes.status === '0') {
        await next(notes);
    }
    notes.notes.forEach((element: any) => {
        element.disDetail = Str.escape2Html(element.detail).replace(/<\/?[^>]+(>|$)/g, '');
    });

    delete notes.status;
    ctx.render('gather.art', {
        ...ctx.res.$initValue,
        ...notes,
        common: {
            hasBanner: false
        }
    });
};