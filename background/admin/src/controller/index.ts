/**
 * @Description: index导航
 * @Author: shenxf
 * @Date: 2019-05-06 21:06:34
 */
import fs from 'fs';
import path from 'path';

export let goIndex = async function (ctx: any) {
    const result = await getIndex();
    ctx.body = result;
};

const getIndex = function() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../public/dist/index.html'), function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });
};