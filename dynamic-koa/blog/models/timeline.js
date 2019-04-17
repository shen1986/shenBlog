/*
 * @Description: 归档模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
var db = require("./db");

/**
 * 取得归档情报
 * @param {number} current - 当前页
 * @param {number} count - 显示记录数
 * @param {number} category - 类别
 */
module.exports.getTimeline = async function (current = 1, count = 30, category = 0) {

	let sqls = [
		"select id, theme from category where status = 1"
	];
		
	let sql = "";
	let field = "article.id, title, created_at";

	if(category == 0) {
		sql = `select ${field} from article where article.status = 1
			order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
		sqls.push(sql);

		sql = 'select count(*) as total from article where status = 1';
		sqls.push(sql);
	} else{
		sql = `select ${field} from article where category = ${+category} and article.status = 1 
			order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
		sqls.push(sql);

		sql = `select count(*) as total from article where status = 1 and category = ${+category}`;

		sqls.push(sql);
	}

	let ps = [];

	for (sql of sqls) {
		ps.push(
			db.query(sql)
		);
	}
	
    try {
        const p = await Promise.all(ps);
        return result(p);
    } catch (error) {
		console.log(error);
        throw error;
    }
}

/**
 * 表示结果包装
 * @param {any} out - sql结果 
 */
var result = function(out) {
    return {
        status: 1,  
        categories: out[0],
        items: out[1],
        total: out[2][0]['total']
    };
}