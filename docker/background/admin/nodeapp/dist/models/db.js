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
 * @Description:
 * @Author: shenxf
 * @Date: 2019-05-09 20:24:10
 */
/*
 * @Description: 连接mysql
 * @Author: shenxf
 * @Date: 2019-04-09 13:35:37
 */
// 连接MySQL
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../common/config/config"));
class Db {
    constructor() {
        /**
         * @description: 数据库操作
         * @param {string} sql - sql文
         * @return: 数据库操作结果
         */
        this.query = (sql) => __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.getConnection();
            const result = yield this.q(conn, sql);
            return result;
        });
        /**
         * @description: 从连接池里面取出连接
         * @return: 数据库连接
         */
        this.getConnection = () => {
            return new Promise((resolved, rejected) => {
                Db.pool.getConnection((err, connection) => {
                    if (err instanceof Error) {
                        rejected(err);
                    }
                    else {
                        resolved(connection);
                    }
                });
            });
        };
        /**
         * @description: 通过连接操作数据库
         * @param {any} connection - 数据库连接
         * @param {string} sql - sql文
         * @return: 操作结果
         */
        this.q = (connection, sql) => {
            return new Promise((resolved, rejected) => {
                connection.query(sql, function (err, rows) {
                    if (err instanceof Error) {
                        rejected(err);
                    }
                    else {
                        resolved(rows);
                    }
                    connection.release(); // 释放链接
                });
            });
        };
        /**
         * @description: 事务处理
         * @param {any} connection - 数据库连接
         * @param {string[]} sqls - 复数sql文
         * @return: 是否成功
         */
        this.t = (connection) => {
            return new Promise((resoloved, rejected) => {
                connection.beginTransaction((err) => {
                    if (err) {
                        throw err;
                    }
                    resoloved();
                });
            });
        };
        this.commit = (connection) => {
            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        throw err;
                    });
                }
            });
        };
        this.qWithP = (connection, params, sql) => {
            return new Promise((resolved, rejected) => {
                connection.query(sql, params, (err, rows, fields) => {
                    if (err instanceof Error) {
                        rejected(err);
                    }
                    else {
                        resolved(rows);
                    }
                });
            });
        };
    }
}
// mysql 连接池 默认最大连接数10,
Db.pool = mysql_1.default.createPool({
    host: config_1.default.host,
    user: config_1.default.user,
    password: config_1.default.password,
    database: config_1.default.database,
    dateStrings: true
});
exports.default = new Db();
