/*
 * @Description: 慢生活模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
import db from './db';
import path from 'path';

export let getGossip = async (current: number = 1, count: number = 30) => {

    const sql = `select gos.detail, gos.created_at,
                pic.base64, pic.file_name from gossip gos
                left join pictrue pic
                on gos.picid = pic.picid
                order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
    try {

        const rows: any = await db.query(sql);

        rows.forEach((item: any) => {
            if (item.base64 && item.base64 !== null && item.file_name !== null) {
                item.url = `data:image/${path.extname(item.file_name)};base64,${item.base64}`;
            }
        });

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
