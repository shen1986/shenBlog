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
const db_1 = __importDefault(require("./db"));
const mysql_1 = __importDefault(require("mysql"));
class ArticleModel {
    constructor() {
        /**
         * @description: 取得所有有效的文章数据
         * @return: 文章数据
         */
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const sql = 'select id, title, type, tag, created_at, views from article ' +
                'where status = 1 order by id desc';
            try {
                const result = yield db_1.default.query(sql);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteById = (id) => __awaiter(this, void 0, void 0, function* () {
            const sql = `update article set status = 0 where id = ${id}`;
            try {
                yield db_1.default.query(sql);
            }
            catch (error) {
                throw error;
            }
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const sql = `select id, title, body, type, category, tag, markdown from article
                    where id = ${+id} and status = 1`;
            try {
                const result = yield db_1.default.query(sql);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        this.update = (article) => __awaiter(this, void 0, void 0, function* () {
            const { id, content, title, tag, category, type, markdown } = article;
            const sql = `update article set body = ${mysql_1.default.escape(content)}, title = ${mysql_1.default.escape(title)}, tag = ${mysql_1.default.escape(tag)},
                    category = ${category}, type = ${type}, markdown = ${markdown}, updated_at = "${new Date().toLocaleDateString()}" where id = ${+id}`;
            try {
                yield db_1.default.query(sql);
            }
            catch (error) {
                throw error;
            }
        });
        this.insert = (article) => __awaiter(this, void 0, void 0, function* () {
            const { content, title, tag, category, type, markdown } = article;
            const sql = `insert into article(title, tag, category, type, created_at, body, markdown) values (${mysql_1.default.escape(title)},
            ${mysql_1.default.escape(tag)}, ${category}, ${type}, "${new Date().toLocaleDateString()}", ${mysql_1.default.escape(content)}, ${markdown})`;
            try {
                yield db_1.default.query(sql);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ArticleModel;
