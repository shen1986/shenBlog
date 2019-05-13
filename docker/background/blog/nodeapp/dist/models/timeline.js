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
exports.getTimeline = (current = 1, count = 30, category = 0) => __awaiter(this, void 0, void 0, function* () {
    const sqls = [
        'select id, theme from category where status = 1'
    ];
    let sql = '';
    const field = 'article.id, title, created_at';
    if (category == 0) {
        sql = `select ${field} from article where article.status = 1
			order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
        sqls.push(sql);
        sql = 'select count(*) as total from article where status = 1';
        sqls.push(sql);
    }
    else {
        sql = `select ${field} from article where category = ${+category} and article.status = 1
			order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
        sqls.push(sql);
        sql = `select count(*) as total from article where status = 1 and category = ${+category}`;
        sqls.push(sql);
    }
    const ps = [];
    for (sql of sqls) {
        ps.push(db_1.default.query(sql));
    }
    try {
        const p = yield Promise.all(ps);
        return result(p);
    }
    catch (error) {
        return { 'status': 0, 'msg': '系统异常' };
    }
});
const result = (out) => {
    return {
        status: 1,
        categories: out[0],
        items: out[1],
        total: out[2][0]['total']
    };
};
