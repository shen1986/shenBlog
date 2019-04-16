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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: 文章数据检索
 * @Author: shenxf
 * @Date: 2019-04-09 20:53:59
 */
const db = __importStar(require("./db"));
const Str = __importStar(require("../common/utils/string"));
const mysql_1 = __importDefault(require("mysql"));
exports.getArticles = function (current, count = null, type = null, category = null, keyword = null, tag = null, deviceAgent = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const field = 'article.id, title, body, tag, created_at, views, theme';
        let sql = `select ${field} from article join category on article.category = category.id`, condition = ' where article.status = 1', totalSql = '';
        if (tag != null) {
            const likeTag1 = mysql_1.default.escape(`%${tag + ' '}%`), likeTag2 = mysql_1.default.escape(`%${' ' + tag}%`);
            tag = mysql_1.default.escape(`${tag}`);
            condition += ` and (tag = ${tag} or tag like ${likeTag1} or tag like ${likeTag2})`;
        }
        if (keyword != null && keyword.trim() !== '') {
            keyword = mysql_1.default.escape(`%${keyword}%`);
            condition += ` and (body like ${keyword} or title like
		${keyword} or tag like ${keyword})`;
        }
        if (category != null && +category !== 0) {
            condition += ` and category = ${+category}`;
        }
        if (type != null && +type !== 0) {
            condition += ` and type = ${+type}`;
        }
        sql += condition;
        sql += ' order by created_at desc';
        if (count != null) {
            if (current != null) {
                sql += ` limit ${(+current - 1) * +count}, ${+count}`;
                totalSql += 'select count(*) as total from article' + condition;
            }
            else {
                sql += ` limit ${+count}`;
            }
        }
        const agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/), absLen = agentID ? 86 : 130;
        let rows = null;
        try {
            rows = (yield db.query(sql));
        }
        catch (error) {
            throw error;
        }
        const info = {};
        const articles = [];
        rows.forEach((item) => {
            articles.push({
                'id': item.id,
                'title': item.title,
                'tag': item.tag,
                'abstract': Str.escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, '')).substr(0, absLen),
                'created_at': item.created_at,
                'views': item.views,
                'theme': item.theme
            });
        });
        info['articles'] = articles;
        // 翻页逻辑，有当前页的时候，求的总页数
        if (current != null) {
            try {
                const totalRows = yield db.query(totalSql);
                info['total'] = totalRows[0]['total'];
                return { 'status': 1, 'info': info };
            }
            catch (error) {
                throw error;
            }
        }
        else {
            return { 'status': 1, 'info': info };
        }
    });
};
exports.getArticleDetail = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `select article.id, title, body, tag, theme, created_at, updated_at, type,
		views, markdown from article join category on article.category = category.id where
		article.id = ${mysql_1.default.escape(id)} and article.status = 1`;
        // 统计文章查看人数。
        // if (!req.session['article_record_' + id]) {
        // 	req.session['article_record_' + id] = true;
        // 	await db.query(`update article set views = views + 1 where id = ${id}`);
        // }
        try {
            const rows = yield db.query(sql);
            return { 'status': 1, '_info': rows ? rows[0] : {} };
        }
        catch (error) {
            return { 'status': 0, 'message': error };
        }
    });
};
//# sourceMappingURL=article.js.map