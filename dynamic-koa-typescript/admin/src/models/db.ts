/*
 * @Description: 连接mysql
 * @Author: shenxf
 * @Date: 2019-04-09 13:35:37
 */
// 连接MySQL
import mysql from 'mysql';

class Db {
    static pool = mysql.createPool({
        host: '47.106.155.211',
        user: 'blog1',
        password: '123456',
        database: 'blog',
        dateStrings: true
    });

    static instence: any = null;

    conn: any = null;

    constructor() {
        this.getConnection().then(
            res => {
                this.conn = res;
            }
        );
    }

    /**
     * @description: 获得单例的mysql
     * @return: Db类的实例
     */
    public static getInstence(): any {
        if (Db.instence === null) {
            Db.instence = new Db();
        }
        return Db.instence;
    }

    public async query(sql: String) {

        const result = await this.q(this.conn, sql);

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
                connection.release(); // 释放链接
            });
        });
    }
}

export default Db;