// 现在业务比较简单所有store放在一个文件里面，以后业务负载的时候
import Vuex from 'Vuex';
export let store = new Vuex.Store({
    state: { // 全局变量
        // 用户验证
        token: localStorage.getItem('token') || null,
    },
    mutations: { // 全局方法
        // 保存token
        saveToken: (state, token) => {
            localStorage.setItem('token', token);
            state.token = token;
        },
    },
});
