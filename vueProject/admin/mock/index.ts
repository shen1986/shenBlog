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
    }
}