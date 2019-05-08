// 现在业务比较简单所有store放在一个文件里面，以后业务复杂的时候
import Vuex from 'Vuex';
import Vue from 'vue';

// 导入vuex全局仓储
Vue.use(Vuex);

export let store = new Vuex.Store({
    state: { // 全局变量
        // 用户验证
        token: localStorage.getItem('token') || null,
        // markdown内容
        mdContent: '',
        // 全局的loading
        spinning: false,
    },
    mutations: { // 全局方法
        // 保存token
        saveToken: (state, token) => {
            localStorage.setItem('token', token);
            state.token = token;
        },
        // 移除token
        removeToken: (state) => {
            localStorage.removeItem('token');
            state.token = null;
        },
        // 保存markdown文本
        saveContent: (state, content) => {
            state.mdContent = content;
        },
        // 转换 loading 状态
        changeLoading: (state, spinning) => {
            state.spinning = spinning;
        },
    },
});
