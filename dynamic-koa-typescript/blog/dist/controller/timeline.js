"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: 归档控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const timelineModel = require('../models/timeline');
// 获得归档页
exports.getTimeline = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeline = yield timelineModel.getTimeline();
        timeline.tlItems = [];
        timeline.items.forEach((item, index, arr) => {
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
        yield ctx.render('timeline.art', Object.assign({}, timeline, ctx.res.$initValue, { common: {
                hasBanner: false
            } }));
    });
};
//# sourceMappingURL=timeline.js.map