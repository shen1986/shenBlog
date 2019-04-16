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
 * @Description: 首页控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:15:13
 */
const articleModel = __importStar(require("../models/article"));
// 获得首页
exports.getHome = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const renderData = yield getArt(ctx);
    yield ctx.render('index.art', renderData);
});
const getArt = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleData = yield articleModel.getArticles(null, 15, 1, null, null, null, ctx.req.headers['user-agent'].toLowerCase());
        const renderData = Object.assign({}, ctx.res.$initValue, articleData.info, { common: {
                banner: true // 显示轮播图
            } });
        return renderData;
    });
};
//# sourceMappingURL=index.js.map