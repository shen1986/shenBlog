/*
 * @Description: 连接mysql
 * @Author: shenxf
 * @Date: 2019-04-09 13:35:37
 */
// 连接MySQL
import mysql from 'mysql';
import config from '../common/config/config';

class Db {
    static pool = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        dateStrings: true
    });

    public async query(sql: String) {

        const conn = await this.getConnection();
        const result = await this.q(conn, sql);

        return result;
    }

    private getConnection() {
        return new Promise((resolved, rejected) => {
            Db.pool.getConnection((err, connection) => {
                if (err instanceof Error) {
                    rejected(err);
                } else {
                    resolved(connection);
                }
            });
        });
    }

    private q(connection: any, sql: String) {
        return new Promise((resolved, rejected) => {
            connection.query(sql, function (err: any, rows: any) {
                if (err instanceof Error) {
                    rejected(err);
                } else {
                    resolved(rows);
                }
                // connection.release(); // 释放链接， 单例模式就不释放连接了。
            });
        });
    }
}

export default new Db();