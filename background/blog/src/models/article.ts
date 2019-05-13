/*
 * @Description: 文章数据检索
 * @Author: shenxf
 * @Date: 2019-04-09 20:53:59
 */
import db from './db';
import * as Str from '../common/utils/string';
import mysql from 'mysql';

export let getArticles = async (current: number,
    count: number = null, type: number = null, category: number = null,
    keyword: String = null, tag: String = null, deviceAgent: any = null) => {

    const field = 'article.id, title, body, tag, created_at, views, theme';
    let sql = `select ${field} from article join category on article.category = category.id`,
        condition = ' where article.status = 1',
        totalSql = '';

    if (tag != null) {
        const likeTag1 = mysql.escape(`%${tag + ' '}%`),
            likeTag2 = mysql.escape(`%${' ' + tag}%`);
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
    sql += ' order by created_at desc';

    if (count != null) {
        if (current != null) {
            sql += ` limit ${(+current - 1) * +count}, ${+count}`;
            totalSql += 'select count(*) as total from article' + condition;
        }
        else {
            sql += ` limit ${+count}`;
        }
    }

    const agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/),
        absLen = agentID ? 86 : 130;

    let rows: any[] = null;

    try {
        rows = await db.query(sql) as any[];
    } catch (error) {
       throw error;
    }

    const info: any = {};
    const articles: any[] = [];

    rows.forEach((item: any) => {
        articles.push({
            'id': item.id,
            'title': item.title,
            'tag': item.tag,
            'abstract': Str.escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, '')).substr(0, absLen),
            'created_at': item.created_at,
            'views': item.views,
            'theme': item.theme
        });
    });
    info['articles'] = articles;

    // 翻页逻辑，有当前页的时候，求的总页数
    if (current != null) {
        try {
            const totalRows: any = await db.query(totalSql);
            info['total'] = totalRows[0]['total'];
            return { 'status': 1, 'info': info };
        } catch (error) {
            throw error;
        }
    }
    else {
        return { 'status': 1, 'info': info };
    }
};

export let getArticleDetail = async (id: number) => {
    const sql = `select article.id, title, body, tag, theme, created_at, updated_at, type,
		views, markdown from article join category on article.category = category.id where
		article.id = ${mysql.escape(id)} and article.status = 1`;

    // 统计文章查看人数。
    // if (!req.session['article_record_' + id]) {
    // 	req.session['article_record_' + id] = true;
    // 	await db.query(`update article set views = views + 1 where id = ${id}`);
    // }

    try {
        const rows: any = await db.query(sql);

        return { 'status': 1, '_info': rows ? rows[0] : {} };
    } catch (error) {
        return { 'status': 0, 'message': error };
    }
};
