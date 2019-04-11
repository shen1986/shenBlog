/*
 * @Description: 点滴控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const gatherModel = require('../models/gather');
var Str = require('../common/utils/string');

// 获得点滴页
exports.getGather = async function (ctx, next) {
    var notes = await gatherModel.getNotes();
    if (notes.status === "0") {
        await next(notes);
    }
    notes.notes.forEach(element => {
        element.disDetail = Str.escape2Html(element.detail).replace(/<\/?[^>]+(>|$)/g, "");
    });

    console.log(notes);

    delete notes.status;
    ctx.render("gather.art", {
        ...ctx.res.$initValue,
        ...notes,
        common: {
            hasBanner: false
        }
    });
};