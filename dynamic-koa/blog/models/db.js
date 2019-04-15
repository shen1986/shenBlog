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
    password: 'root',
    database: 'blog',
    dateStrings: true
});

async function query(sql) {
    
    var conn = await getConnection();
    var result =  await q(conn, sql);

    return result;
}

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


exports.query = query;