import db from './db';
import mysql from 'mysql';

class CategoryModel {

    /**
     * @description: 取得所有有效的分类数据
     * @return: 分类数据
     */
    public findAll = async (): Promise<any> => {
        const sql = `select id, theme from category where status = 1`;
        try {
            const result = await db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default CategoryModel;