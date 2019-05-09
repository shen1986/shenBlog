/*
 * @Description: 用户模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
import db from './db';
import mysql from 'mysql';

class UserModel {

    /**
     * @description: 通过用户名取得密码
     * @param {string} userid - 用户id
     * @return: 用户的password 或则 error
     */
    public async getPassword (userid: string) {

        const sql = `select password from user where userid = ${mysql.escape(userid)}`;

        try {
            const result: any = db.query(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default UserModel;
