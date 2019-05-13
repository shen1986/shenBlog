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
 * @Description: 点滴控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */
const gatherModel = __importStar(require("../models/gather"));
const Str = __importStar(require("../common/utils/string"));
// 获得点滴页
exports.getGather = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const notes = yield gatherModel.getNotes();
    if (notes.status === '0') {
        yield next(notes);
    }
    notes.notes.forEach((element) => {
        element.disDetail = Str.escape2Html(element.detail).replace(/<\/?[^>]+(>|$)/g, '');
    });
    delete notes.status;
    ctx.render('gather.art', Object.assign({}, ctx.res.$initValue, notes, { common: {
            hasBanner: false
        } }));
});
