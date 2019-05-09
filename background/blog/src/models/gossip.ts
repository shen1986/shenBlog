/*
 * @Description: 慢生活模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
import db from './db';

export let getGossip = async function (current: number = 1, count: number = 30) {

    const sql = `select * from gossip order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
    try {

        const rows = await db.query(sql);

        const t: any = await db.query('select count(*) as total from gossip');

        return {
            'status': 1,
            'gossips': rows,
            'total': t[0]['total']
        };
    } catch (error) {
        throw error;
    }
};
