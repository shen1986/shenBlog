/*
 * @Description: 连接mysql
 * @Author: shenxf
 * @Date: 2019-04-09 13:35:37
 */
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '580114',
    database: 'blog2',
    dateStrings: true
});

/**
 * 连接数据库并操作
 * @param {string} sql - sql文
 */
exports.query = async function query(sql) {
    
    try {
        var conn = await getConnection();
        var result =  await q(conn, sql);
    } catch (error) {
        console.log(error);
        throw error;
    }

    return result;
}

/**
 * 取得连接
 */
var getConnection = function () {
    return new Promise((resolved, rejected ) => {
        pool.getConnection((err,connection) => {
            if (err instanceof Error) {
                rejected(err);
            } else {
                resolved(connection)
            }
        })
    });
}

/**
 * 操作数据库
 * @param {any} connection -  数据库连接信息
 * @param {string} sql - sql文
 */
var q = function(connection, sql) {
    return new Promise((resolved, rejected) => {
        connection.query(sql, function (err, rows) {
            if (err instanceof Error) {
                rejected(err);
            } else {
                resolved(rows)
            }
            connection.release(); //释放链接
        })
    });
}
