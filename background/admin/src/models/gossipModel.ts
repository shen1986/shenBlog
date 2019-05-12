/**
 * @Description: 说说模型
 * @Author: shenxf
 * @Date: 2019-05-09 20:24:10
 */
import db from './db';
import mysql from 'mysql';
import moment from 'moment';

class GossipModel {

    public findAll = async (): Promise<any> => {
        const sql = `select id,
                            detail,
                            created_at
                        from gossip
                        order by id desc`;

        try {
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public deleteById = async (id: string): Promise<void> => {
        const sql = `delete from gossip where id = ${+id}`;

        try {
            await db.query(sql);
        } catch (error) {
            throw error;
        }
    }

    public findById = async (id: string): Promise<any> => {
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
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public saveGosAndFile = async (gossipInfo: any): Promise<void> => {
        const detail = gossipInfo.detail;
        let base64: string = '', file_name: string = '';
        if (typeof gossipInfo.upload !== 'undefined' &&
            gossipInfo.upload.length !== 0) {
            base64 = gossipInfo.upload[0].base64;
            file_name = gossipInfo.upload[0].name;
        }
        console.log(gossipInfo);
        const create_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        if (base64 !== '') {
            try {
                const conn = await db.getConnection();
                console.log(conn);
                let lastId: any = null;
                db.t(conn).then(() => {
                    return db.qWithP(
                        conn,
                        null,
                        `INSERT INTO pictrue (base64, file_name)
                        VALUES (${mysql.escape(base64)}, ${mysql.escape(file_name)})`);
                })
                .then((rows: any) => {
                    lastId = rows.insertId;
                    console.log(lastId);
                    return db.qWithP(
                        conn,
                        lastId,
                        `INSERT INTO gossip(detail, created_at, picid)
                        VALUES (${mysql.escape(detail)},
                        ${mysql.escape(create_at)}, ? )`);
                })
                .then((rows: any) => {
                    db.commit(conn);
                });
            } catch (error) {
                throw error;
            }
        } else {
            const sql = `INSERT INTO gossip(detail, created_at); VALUES (${mysql.escape(detail)},
                  '${create_at}' )`;

            try {
                await db.query(sql);
            } catch (error) {
                throw error;
            }
        }
    }

    public updateGosAndFile = async (gossipInfo: any): Promise<void> => {
        const {detail, id} = gossipInfo;
        let base64: string = '', file_name: string = '';
        if (typeof gossipInfo.upload !== 'undefined' &&
            gossipInfo.upload.length !== 0) {
            base64 = gossipInfo.upload[0].base64;
            file_name = gossipInfo.upload[0].name;
        }
        const update_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        try {
            if (base64 !== '') {
                const info: any = await this.findById(id);
                if (info && info.length > 0) {
                    console.log(info);
                    // gossip里面有picid 执行更新
                    if (typeof info[0].uid !== 'undefined' && info[0].uid !== null) {
                        let sql = `UPDATE pictrue SET base64=${mysql.escape(base64)} WHERE picid=${mysql.escape(info[0].uid)}`;
                        await db.query(sql);

                        sql = `UPDATE gossip
                            SET detail=${mysql.escape(detail)},
                                updated_at=${mysql.escape(update_at)}
                            WHERE id=${mysql.escape(id)}`;
                        await db.query(sql);
                    // gossip里面没有pic 执行插入
                    } else {
                        const sql = `INSERT INTO pictrue (base64, file_name) VALUES(${mysql.escape(base64)}, ${mysql.escape(file_name)})`;

                        const rows = await db.query(sql);

                        // gossip表的picid更新
                        if (rows && typeof rows.insertId !== 'undefined') {
                            if (rows.insertId !== 0) {
                                const sql = `UPDATE gossip
                                            SET picid = ${mysql.escape(rows.insertId)},
                                                detail=${mysql.escape(detail)},
                                                updated_at=${mysql.escape(update_at)}
                                            WHERE id=${mysql.escape(id)}`;
                                await db.query(sql);
                            }
                        }
                    }
                } else {
                    throw new Error('没有对应的数据');
                }
            } else {
                const info: any = await this.findById(id);
                console.log(info);
                if (info && info.length > 0) {
                    // gossip里面有picid 更新成null
                    if (typeof info[0].uid !== 'undefined') {
                        let sql = `UPDATE gossip
                                    SET picid=null
                                    WHERE id=${mysql.escape(id)}`;
                        await db.query(sql);

                        // 删除picture表
                        sql = `DELETE FROM gossip where picid=${mysql.escape(info[0].uid)}`;
                        await db.query(sql);
                    }
                    const sql = `UPDATE gossip
                                SET detail=${mysql.escape(detail)},
                                    updated_at=${mysql.escape(update_at)}
                                WHERE id=${mysql.escape(id)}`;
                    await db.query(sql);
                } else {
                    throw new Error('没有对应的数据');
                }
            }
        } catch (error) {
            throw error;
        }
    }
}

export default GossipModel;