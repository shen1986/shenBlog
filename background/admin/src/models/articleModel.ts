import db from './db';
import mysql from 'mysql';

class ArticleModel {

    /**
     * @description: 取得所有有效的文章数据
     * @return: 文章数据
     */
    public findAll = async () => {
        const sql = 'select id, title, type, tag, created_at, views from article ' +
                    'where status = 1 order by id desc';
        try {
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public deleteById = async (id: string): Promise<void> => {
        const sql = `update article set status = 0 where id = ${id}`;

        try {
            await db.query(sql);
        } catch (error) {
            throw error;
        }
    }

    public findById = async (id: string): Promise<any> => {
        const sql = `select id, title, body, type, category, tag, markdown from article
                    where id = ${+id} and status = 1`;
        try {
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public update = async (article: any): Promise<void> => {
        const { id, content, title, tag, category, type, markdown } = article;
        const sql = `update article set body = ${mysql.escape(content)}, title = ${mysql.escape(title)}, tag = ${mysql.escape(tag)},
                    category = ${category}, type = ${type}, markdown = ${markdown} updated_at = "${new Date().toLocaleDateString()}" where id = ${+id}`;

        try {
            await db.query(sql);
        } catch (error) {
            throw error;
        }
    }

    public insert = async (article: any): Promise<void> => {
        const { content, title, tag, category, type, markdown } = article;
        const sql = `insert into article(title, tag, category, type, created_at, body, markdown) values (${mysql.escape(title)},
            ${mysql.escape(tag)}, ${category}, ${type}, "${new Date().toLocaleDateString()}", ${mysql.escape(content)}, ${markdown})`;

        try {
            await db.query(sql);
        } catch (error) {
            throw error;
        }
    }

}

export default ArticleModel;