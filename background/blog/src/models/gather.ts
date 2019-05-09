/*
 * @Description: 点滴模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
import db from './db';

export let getNotes = async function (current: number = 1, count: number = 30) {

    const field = 'id, title, detail, tag, created_at';
    const sql = `select ${field} from gather where status = 1 order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
    try {
        const rows = await db.query(sql);

        const t: any = await db.query('select count(*) as total from gather where status = 1 ');

        return {
            'status': 1,
            'notes': rows,
            'total': t[0]['total']
        };
    } catch (error) {
        throw error;
    }
};
