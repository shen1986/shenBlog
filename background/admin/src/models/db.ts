/**
 * @Description:
 * @Author: shenxf
 * @Date: 2019-05-09 20:24:10
 */
/*
 * @Description: 连接mysql
 * @Author: shenxf
 * @Date: 2019-04-09 13:35:37
 */
// 连接MySQL
import mysql from 'mysql';
import config from '../common/config/config';

class Db {
    // mysql 连接池 默认最大连接数10,
    static pool = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        dateStrings: true
    });

    /**
     * @description: 数据库操作
     * @param {string} sql - sql文
     * @return: 数据库操作结果
     */
    public query = async (sql: string): Promise<any> => {

        // console.log(sql);
        const conn = await this.getConnection();

        const result = await this.q(conn, sql);

        return result;
    }

    /**
     * @description: 从连接池里面取出连接
     * @return: 数据库连接
     */
    public getConnection = (): Promise<any> => {
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

    /**
     * @description: 通过连接操作数据库
     * @param {any} connection - 数据库连接
     * @param {string} sql - sql文
     * @return: 操作结果
     */
    private q = (connection: any, sql: string): Promise<any> => {
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

    /**
     * @description: 事务处理
     * @param {any} connection - 数据库连接
     * @param {string[]} sqls - 复数sql文
     * @return: 是否成功
     */
    public t = (connection: any): Promise<any> => {
        return new Promise((resoloved, rejected) => {
            connection.beginTransaction((err: any) => {
                if (err) { throw err; }
                resoloved();
            });
        });
    }

    public commit = (connection: any) => {
        connection.commit(function(err: any) {
            if (err) {
              return connection.rollback(function() {
                throw err;
              });
            }
        });
    }

    public qWithP = (connection: any, params: any, sql: string): Promise<any> => {
        return new Promise((resolved, rejected) => {
            connection.query(sql, params, (err: any, rows: any, fields: any) => {
                if (err instanceof Error) {
                    rejected(err);
                } else {
                    resolved(rows);
                }
            });
        });
    }
}

export default new Db();