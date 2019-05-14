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
 * @Description: 用户模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
const db_1 = __importDefault(require("./db"));
const mysql_1 = __importDefault(require("mysql"));
class UserModel {
    constructor() {
        /**
         * @description: 通过用户名取得密码
         * @param {string} userid - 用户id
         * @return: 用户的password 或则 error
         */
        this.getPassword = (userid) => __awaiter(this, void 0, void 0, function* () {
            const sql = `select password from user where userid = ${mysql_1.default.escape(userid)}`;
            try {
                const result = yield db_1.default.query(sql);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserModel;
