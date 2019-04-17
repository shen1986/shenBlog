/*
 * @Description: 文章数据检索
 * @Author: shenxf
 * @Date: 2019-04-09 20:53:59
 */
var db = require("./db");
var Str = require('../common/utils/string');
var mysql = require('mysql');

/**
 * 获取文章
 */
module.exports.getArticles = async function (current, count = null, type = null, category = null, keyword = null, tag = null, deviceAgent = null) {

    let field = "article.id, title, body, tag, created_at, views, theme";
    let sql = `select ${field} from article join category on article.category = category.id`,
        condition = " where article.status = 1",
        totalSql = '';

    if (tag != null) {
        let likeTag1 = mysql.escape(`%${tag + " "}%`),
            likeTag2 = mysql.escape(`%${" " + tag}%`);
        tag = mysql.escape(`${tag}`);

        condition += ` and (tag = ${tag} or tag like ${likeTag1} or tag like ${likeTag2})`;
    }
    if (keyword != null && keyword.trim() !== '') {
        keyword = mysql.escape(`%${keyword}%`);
        condition += ` and (body like ${keyword} or title like 
		${keyword} or tag like ${keyword})`;
    }
    if (category != null && +category !== 0) {
        condition += ` and category = ${+category}`;
    }
    if (type != null && +type !== 0) {
        condition += ` and type = ${+type}`;
    }

    sql += condition;
    sql += " order by created_at desc";

    if (count != null) {
        if (current != null) {
            sql += ` limit ${(+current - 1) * +count}, ${+count}`;
            totalSql += "select count(*) as total from article" + condition;
        }
        else {
            sql += ` limit ${+count}`;
        }
    }

    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/),
        absLen = agentID ? 86 : 130;

    var rows = null

    try {
        rows = await db.query(sql);
    } catch (error) {
        throw error;
    }

    let info = {};
    let articles = [];

    rows.forEach(item => {
        articles.push({
            'id': item.id,
            'title': item.title,
            'tag': item.tag,
            'abstract': Str.escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, "")).substr(0, absLen),
            'created_at': item.created_at,
            'views': item.views,
            'theme': item.theme
        })
    });
    info['articles'] = articles;

    // 翻页逻辑，有当前页的时候，求的总页数
    if (current != null) {
        try {
            var totalRows = await db.query(totalSql);
            info['total'] = totalRows[0]['total'];
            return { 'status': 1, 'info': info };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    else {
        return { 'status': 1, 'info': info };
    }
};

/**
 * 获取详细页
 * @param {number} id - 文章id 
 */
module.exports.getArticleDetail  = async function (id) {
	let sql = `select article.id, title, body, tag, theme, created_at, updated_at, type, 
		views, markdown from article join category on article.category = category.id where 
		article.id = ${mysql.escape(id)} and article.status = 1`;

    // 统计文章查看人数。
	// if (!req.session['article_record_' + id]) {
	// 	req.session['article_record_' + id] = true;
	// 	await db.query(`update article set views = views + 1 where id = ${id}`);
	// }
    
    try {
        var rows = await db.query(sql);

        return {"status": 1, "_info": rows ? rows[0] : {}}
    } catch (error) {
        console.log(error);
        throw error;
    }
};