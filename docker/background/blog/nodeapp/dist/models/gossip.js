"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: 慢生活模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
const db_1 = __importDefault(require("./db"));
const path_1 = __importDefault(require("path"));
exports.getGossip = (current = 1, count = 30) => __awaiter(this, void 0, void 0, function* () {
    const sql = `select gos.detail, gos.created_at,
                pic.base64, pic.file_name from gossip gos
                left join pictrue pic
                on gos.picid = pic.picid
                order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
    try {
        const rows = yield db_1.default.query(sql);
        rows.forEach((item) => {
            if (item.base64 && item.base64 !== null && item.file_name !== null) {
                item.url = `data:image/${path_1.default.extname(item.file_name)};base64,${item.base64}`;
            }
        });
        console.log(rows);
        const t = yield db_1.default.query('select count(*) as total from gossip');
        return {
            'status': 1,
            'gossips': rows,
            'total': t[0]['total']
        };
    }
    catch (error) {
        throw error;
    }
});
