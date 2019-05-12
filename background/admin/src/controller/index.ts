/**
 * @Description: index导航
 * @Author: shenxf
 * @Date: 2019-05-06 21:06:34
 */
import fs from 'fs';
import path from 'path';

class Index {

    /**
     * @description: 取得index画面并设置html返回
     * @param {any} ctx - koa环境上下文
     */
    public goIndex = async (ctx: any): Promise<void> => {
        try {
            const result = await this.getIndex('vue');
            ctx.body = result;
        } catch (error) {
            // 不存在的时候看看react是否存在
            const result = await this.getIndex('react');
            ctx.body = result;
        }
    }

    /**
     * @description: 取得index画面
     * @return: index的html
     */
    private getIndex = (type: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, `../public/${type}/index.html`),
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.toString());
                    }
                }
            );
        });
    }
}

export default new Index();