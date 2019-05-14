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
/**
 * @Description: index导航
 * @Author: shenxf
 * @Date: 2019-05-06 21:06:34
 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Index {
    constructor() {
        /**
         * @description: 取得index画面并设置html返回
         * @param {any} ctx - koa环境上下文
         */
        this.goIndex = (ctx) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getIndex('vue');
                ctx.body = result;
            }
            catch (error) {
                // 不存在的时候看看react是否存在
                const result = yield this.getIndex('react');
                ctx.body = result;
            }
        });
        /**
         * @description: 取得index画面
         * @return: index的html
         */
        this.getIndex = (type) => {
            return new Promise((resolve, reject) => {
                fs_1.default.readFile(path_1.default.join(__dirname, `../public/${type}/index.html`), (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data.toString());
                    }
                });
            });
        };
    }
}
exports.default = new Index();
