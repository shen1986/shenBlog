/*
 * @Description: 点滴控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
import * as gatherModel from '../models/gather';
import * as Str from '../common/utils/string';

// 获得点滴页
export let getGather = async (ctx: any, next: any) => {
    const notes: any = await gatherModel.getNotes();

    if (notes.status === '0') {
        await next(notes);
    }
    notes.notes.forEach((element: any) => {
        element.disDetail = Str.escape2Html(element.detail).replace(/<\/?[^>]+(>|$)/g, '');
    });

    delete notes.status;
    await ctx.render('gather.art', {
        ...ctx.res.$initValue,
        ...notes,
        common: {
            hasBanner: false
        }
    });
};

export let getNote = async (ctx: any, next: any) => {
    const { current = 1, count = 15 } = ctx.query;

    const notes: any = await gatherModel.getNotes(current, count);

    notes.notes.forEach((element: any) => {
        element.disDetail = Str.escape2Html(element.detail).replace(/<\/?[^>]+(>|$)/g, '');
    });

    delete notes.status;
    await ctx.render('gather-page.art', {
        ...notes,
    });
};