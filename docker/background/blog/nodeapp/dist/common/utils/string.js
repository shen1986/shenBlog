"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:  html符号转换工具类
 * @Author: shenxf
 * @Date: 2019-04-10 21:29:15
 */
exports.escape2Html = function (str) {
    const arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
};
