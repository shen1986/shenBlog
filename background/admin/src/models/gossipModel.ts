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
        const sql = 'select id, detail, created_at from gossip order by id desc';

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
        const sql = `select id, detail, file_name, save_name from gossip where id = ${+id}`;

        try {
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public saveGosAndFile = async (gossipInfo: any): Promise<void> => {
        const detail = gossipInfo.detail;
        const { base64, file_name } = gossipInfo.upload;
        const sqls: string[] = [];
        let sql: string = '';
        const create_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        console.log(create_at);

        sql = `INSERT INTO picture (base64, file_name) VALUES (${mysql.escape(base64)}, ${mysql.escape(file_name)})`;
        sqls.push(sql);
        sql = 'SELECT LAST_INSERT_ID()';
        sqls.push(sql);
        sql = `INSERT INTO gossip(detail, created_at, picid) VALUES (${mysql.escape(detail)},
              '${create_at}', ? )`;
        sqls.push(sql);

        try {
            db.transaction(sqls);
        } catch (error) {
            throw error;
        }
    }

    public updateGosAndFile = async (gossipInfo: any): Promise<void> => {

    }
}

export default GossipModel;