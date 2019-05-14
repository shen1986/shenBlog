"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
exports.addToken = (userinfo) => {
    const token = jsonwebtoken_1.default.sign({
        userid: userinfo.userid,
        password: userinfo.password
    }, config_1.default.tokenSerect, { expiresIn: '1h' });
    return token;
};
exports.decoded = (tokens) => {
    if (tokens) {
        const toke = tokens.split(' ')[1];
        // 解析
        const decoded = jsonwebtoken_1.default.decode(toke);
        return decoded;
    }
};
