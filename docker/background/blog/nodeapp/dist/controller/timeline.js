"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: 归档控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const timelineModel = __importStar(require("../models/timeline"));
// 获得归档页
exports.getTimeline = (ctx) => __awaiter(this, void 0, void 0, function* () {
    let timeline = yield timelineModel.getTimeline();
    timeline = PreperTimeline(timeline);
    yield ctx.render('timeline.art', Object.assign({}, ctx.res.$initValue, timeline, { common: {
            hasBanner: false
        } }));
});
exports.getTimelinebySel = (ctx) => __awaiter(this, void 0, void 0, function* () {
    let timeline = yield timelineModel.getTimeline(ctx.query.current, ctx.query.count, ctx.query.category);
    timeline = PreperTimeline(timeline);
    yield ctx.render('timeline-sel.art', Object.assign({}, timeline));
});
const PreperTimeline = (timeline) => {
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
    return timeline;
};
