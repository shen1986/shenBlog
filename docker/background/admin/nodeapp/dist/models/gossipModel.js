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
 * @Description: 说说模型
 * @Author: shenxf
 * @Date: 2019-05-09 20:24:10
 */
const db_1 = __importDefault(require("./db"));
const mysql_1 = __importDefault(require("mysql"));
const moment_1 = __importDefault(require("moment"));
class GossipModel {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const sql = `select id,
                            detail,
                            created_at
                        from gossip
                        order by id desc`;
            try {
                const result = yield db_1.default.query(sql);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteById = (id) => __awaiter(this, void 0, void 0, function* () {
            const sql = `delete from gossip where id = ${+id}`;
            try {
                yield db_1.default.query(sql);
            }
            catch (error) {
                throw error;
            }
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const sql = `select gos.id,
                            gos.detail,
                            gos.created_at,
                            gos.picid as uid,
                            pic.base64,
                            pic.file_name
                        from gossip gos
                        left join pictrue pic
                        on gos.picid = pic.picid
                        where id = ${+id}`;
            try {
                const result = yield db_1.default.query(sql);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        this.saveGosAndFile = (gossipInfo) => __awaiter(this, void 0, void 0, function* () {
            const detail = gossipInfo.detail;
            let base64 = '', file_name = '';
            if (typeof gossipInfo.upload !== 'undefined' &&
                gossipInfo.upload.length !== 0) {
                base64 = gossipInfo.upload[0].base64;
                file_name = gossipInfo.upload[0].name;
            }
            const create_at = moment_1.default(new Date()).format('YYYY-MM-DD HH:mm:ss');
            if (base64 !== '') {
                try {
                    const conn = yield db_1.default.getConnection();
                    let lastId = null;
                    db_1.default.t(conn).then(() => {
                        return db_1.default.qWithP(conn, null, `INSERT INTO pictrue (base64, file_name)
                        VALUES (${mysql_1.default.escape(base64)}, ${mysql_1.default.escape(file_name)})`);
                    })
                        .then((rows) => {
                        lastId = rows.insertId;
                        return db_1.default.qWithP(conn, lastId, `INSERT INTO gossip(detail, created_at, picid)
                        VALUES (${mysql_1.default.escape(detail)},
                        ${mysql_1.default.escape(create_at)}, ? )`);
                    })
                        .then((rows) => {
                        db_1.default.commit(conn);
                    });
                }
                catch (error) {
                    throw error;
                }
            }
            else {
                const sql = `INSERT INTO gossip(detail, created_at); VALUES (${mysql_1.default.escape(detail)},
                  '${create_at}' )`;
                try {
                    yield db_1.default.query(sql);
                }
                catch (error) {
                    throw error;
                }
            }
        });
        this.updateGosAndFile = (gossipInfo) => __awaiter(this, void 0, void 0, function* () {
            const { detail, id } = gossipInfo;
            let base64 = '', file_name = '';
            if (typeof gossipInfo.upload !== 'undefined' &&
                gossipInfo.upload.length !== 0) {
                base64 = gossipInfo.upload[0].base64;
                file_name = gossipInfo.upload[0].name;
            }
            const update_at = moment_1.default(new Date()).format('YYYY-MM-DD HH:mm:ss');
            try {
                if (base64 !== '') {
                    const info = yield this.findById(id);
                    if (info && info.length > 0) {
                        // gossip里面有picid 执行更新
                        if (typeof info[0].uid !== 'undefined' && info[0].uid !== null) {
                            let sql = `UPDATE pictrue SET base64=${mysql_1.default.escape(base64)} WHERE picid=${mysql_1.default.escape(info[0].uid)}`;
                            yield db_1.default.query(sql);
                            sql = `UPDATE gossip
                            SET detail=${mysql_1.default.escape(detail)},
                                updated_at=${mysql_1.default.escape(update_at)}
                            WHERE id=${mysql_1.default.escape(id)}`;
                            yield db_1.default.query(sql);
                            // gossip里面没有pic 执行插入
                        }
                        else {
                            const sql = `INSERT INTO pictrue (base64, file_name) VALUES(${mysql_1.default.escape(base64)}, ${mysql_1.default.escape(file_name)})`;
                            const rows = yield db_1.default.query(sql);
                            // gossip表的picid更新
                            if (rows && typeof rows.insertId !== 'undefined') {
                                if (rows.insertId !== 0) {
                                    const sql = `UPDATE gossip
                                            SET picid = ${mysql_1.default.escape(rows.insertId)},
                                                detail=${mysql_1.default.escape(detail)},
                                                updated_at=${mysql_1.default.escape(update_at)}
                                            WHERE id=${mysql_1.default.escape(id)}`;
                                    yield db_1.default.query(sql);
                                }
                            }
                        }
                    }
                    else {
                        throw new Error('没有对应的数据');
                    }
                }
                else {
                    const info = yield this.findById(id);
                    if (info && info.length > 0) {
                        // gossip里面有picid 更新成null
                        if (typeof info[0].uid !== 'undefined') {
                            let sql = `UPDATE gossip
                                    SET picid=null
                                    WHERE id=${mysql_1.default.escape(id)}`;
                            yield db_1.default.query(sql);
                            // 删除picture表
                            sql = `DELETE FROM gossip where picid=${mysql_1.default.escape(info[0].uid)}`;
                            yield db_1.default.query(sql);
                        }
                        const sql = `UPDATE gossip
                                SET detail=${mysql_1.default.escape(detail)},
                                    updated_at=${mysql_1.default.escape(update_at)}
                                WHERE id=${mysql_1.default.escape(id)}`;
                        yield db_1.default.query(sql);
                    }
                    else {
                        throw new Error('没有对应的数据');
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = GossipModel;
