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
        const result = await this.getIndex();
        ctx.body = result;
    }

    /**
     * @description: 取得index画面
     * @return: index的html
     */
    private getIndex = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '../public/dist/index.html'),
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