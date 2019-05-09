import db from './db';
import mysql from 'mysql';

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
}

export default GossipModel;