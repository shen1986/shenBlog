import db from './db';
import mysql from 'mysql';

class GatherModel {

    public findAll = async (): Promise<any> => {
        const sql = 'select id, title, tag, created_at from gather where status = 1 order by id desc';

        try {
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    };

    public deleteById = async (id: string): Promise<void> => {
        const sql = `update gather set status = 0 where id = ${+id}`;

        try {
            await db.query(sql);
        } catch (error) {
            throw error;
        }
    }

    public findById = async (id: string): Promise<any> => {
        const sql = `select id, title, detail, tag from gather where id = ${+id} and status = 1`;

        try {
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public update = async (gatherInfo: any): Promise<void> => {
        const { id, content, title, tag } = gatherInfo;

        const sql = `update gather set detail = ${mysql.escape(content)}, title = ${mysql.escape(title)},
                    tag = ${mysql.escape(tag)}, updated_at = "${new Date().toLocaleDateString()}" where id = ${+id}`;
        try {
            await db.query(sql);
        } catch (error) {
            throw error;
        }
    }

    public insert = async (gatherInfo: any): Promise<void> => {
        const { content, title, tag } = gatherInfo;
        const sql = `insert into gather(title, tag, created_at, detail) values (${mysql.escape(title)},
                    ${mysql.escape(tag)}, "${new Date().toLocaleDateString()}", ${mysql.escape(content)})`;
        try {
            await db.query(sql);
        } catch (error) {
            throw error;
        }
    }
}

export default GatherModel;