/*
 * @Description: 点滴模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
var db = require("./db");

var getNotes = async function (current = 1, count = 30) {

    let field = "id, title, detail, tag, created_at";
    let sql = `select ${field} from gather where status = 1 order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;

    try {
        var rows = await db.query(sql);

        var t = await db.query('select count(*) as total from gather where status = 1 ');

        return {
            "status": 1,
            "notes": rows,
            "total": t[0]['total']
        };
    } catch (error) {
        if (error instanceof MysqlError) {
            return { 'status': 0, 'message': error.sqlMessage };
        } else {
            return { "status": 0, "message": '系统异常' }
        }
    }
}

module.exports.getNotes = getNotes;