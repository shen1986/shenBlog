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
 * @Description: 慢生活控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:15:13
 */
const gossipModel = require('../models/gossip');
// 慢生活首页
exports.getGossip = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const gossip = yield gossipModel.getGossip();
        delete gossip.status;
        yield ctx.render('gossip.art', Object.assign({}, gossip, ctx.res.$initValue, { common: {
                hasBanner: false
            } }));
    });
};
//# sourceMappingURL=gossip.js.map