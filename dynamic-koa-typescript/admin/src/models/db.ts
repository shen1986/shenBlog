/*
 * @Description: 连接mysql
 * @Author: shenxf
 * @Date: 2019-04-09 13:35:37
 */
// 连接MySQL
import mysql from 'mysql';

const pool = mysql.createPool({
    host: '47.106.155.211',
    user: 'blog1',
    password: '123456',
    database: 'blog',
    dateStrings: true
});

export let query = async function query(sql: String) {

    const conn = await getConnection();
    const result =  await q(conn, sql);

    return result;
};

const getConnection = function () {
    return new Promise((resolved, rejected ) => {
        pool.getConnection((err, connection) => {
            if (err instanceof Error) {
                rejected(err);
            } else {
                resolved(connection);
            }
        });
    });
};

const q = function(connection: any, sql: String) {
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
};
