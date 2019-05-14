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
const articleModel_1 = __importDefault(require("../models/articleModel"));
class Article {
    constructor() {
        /**
         * @description: 取得文章列表
         * @param {any} ctx - koa上下文
         */
        this.getArticles = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const articleModel = new articleModel_1.default();
            try {
                const rows = yield articleModel.findAll();
                ctx.body = {
                    status: 1,
                    info: rows
                };
            }
            catch (error) {
                ctx.body = {
                    status: 0,
                    msg: '查询失败'
                };
            }
        });
        /**
         * @description: 删除文章
         * @param {any} ctx - koa上下文
         */
        this.delArticle = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const { id } = ctx.params;
            const articleModel = new articleModel_1.default();
            try {
                yield articleModel.deleteById(id);
                ctx.body = {
                    status: 1
                };
            }
            catch (error) {
                ctx.body = {
                    status: 0,
                    msg: '删除失败'
                };
            }
        });
        /**
         * @description: 查找文章
         * @param {any} ctx - koa上下文
         */
        this.findArticle = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const { id } = ctx.params;
            const articleModel = new articleModel_1.default();
            try {
                const rows = yield articleModel.findById(id);
                ctx.body = {
                    status: 1,
                    info: rows.length == 1 ? rows[0] : {}
                };
            }
            catch (error) {
                ctx.body = {
                    status: 0,
                    msg: '查询失败'
                };
            }
        });
        this.submitArticle = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const articleModel = new articleModel_1.default();
            try {
                if (ctx.request.body.id !== '') {
                    articleModel.update(ctx.request.body);
                }
                else {
                    articleModel.insert(ctx.request.body);
                }
                ctx.body = {
                    status: 1
                };
            }
            catch (error) {
                console.log(error);
                ctx.body = {
                    status: 0,
                    msg: '操作失败'
                };
            }
        });
    }
}
exports.default = new Article();
