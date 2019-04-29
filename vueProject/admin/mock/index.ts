/**
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-28 21:13:25
 */
//导入模块
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { Goods } from "./data/goods";
import { Users } from "./data/users";

export default {
    init() {
        var mock = new MockAdapter(axios)
        mock.onGet('/users').reply(200, {
            code: 1001, msg: '请求成功', Users
        })
        mock.onGet('/goods').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        goods: Goods,
                        config: config.params
                    }])
                }, 500)
            })
        })

        mock.onPost('/toLogin').reply(config => {
            let { userName, password } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user: any = config.data;
                setTimeout(() => {
                    if (userName === "admin" && password === "123456") {
                        resolve([200, { status: 1}]);
                    } else {
                        resolve([200, { status: 0, msg: '账号或密码错误' }]);
                    }
                }, 1000);
            });
        });

        mock.onGet('/get-articles').reply(200, { "status": 1, "info": [{ "id": 1, "title": "java提高篇-----详解java的四舍五入与保留位1", "type": 1, "tag": "aa", "created_at": "2019-04-23", "views": 0 }] }
        );
        mock.onGet('/get-gather').reply(200, { "status": 1, "info": [{ "id": 1, "title": "java提高篇----asdfasdf", "tag": "aa,bbb", "created_at": "2019-04-25" }] }
        );
        mock.onGet('/get-gossip').reply(200, { "status": 1, "info": [{ "id": 1, "detail": "测试一下", "created_at": "2019-04-28 14:30:10" }] }
        );
        mock.onGet('/get-categories').reply(200, { "status": 1, "info": [{ "id": 1, "theme": "HTML" }, { "id": 2, "theme": "JavaScript" }] });

        const artDelUri = '/article-delete';
        const delurl = new RegExp(`${artDelUri}/*`);

        mock.onGet(delurl).reply(200, { "status": 1 });

        const gatDelUri = '/gather-delete';
        const gaturl = new RegExp(`${gatDelUri}/*`);

        mock.onGet(gaturl).reply(200, { "status": 1 });

        const gosDelUri = '/gossip-delete';
        const gosurl = new RegExp(`${gosDelUri}/*`);

        mock.onGet(gosurl).reply(200, { "status": 1 });
    }
}