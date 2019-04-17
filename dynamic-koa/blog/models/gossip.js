/*
 * @Description: 慢生活模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
var db = require("./db");

/**
 * 取得慢生活情报
 * @param {number} current - 当前页
 * @param {number} count - 显示记录数
 */
module.exports.getGossip = async function (current = 1, count = 30) {

    let sql = `select * from gossip order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;

    try {

        var rows = await db.query(sql);

        var t = await db.query('select count(*) as total from gossip');

        return {
            "status": 1,
            "gossips": rows,
            "total": t[0]['total']
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
