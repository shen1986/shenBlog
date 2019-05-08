// 导入Axios
import Axios from 'axios';
// 导入本地的store
import store from '../store';
// 导入路由
import router from '../router/router';

// 设置Axios基础配置
Axios.defaults.baseURL = 'http://127.0.0.1:8080';
Axios.defaults.timeout = 20000; // 20秒超时
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截
Axios.interceptors.request.use(
    config => {
        /*
         * 每次发送请求之前判断vuex中是否存在token
         * 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录状况
         * 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
         */
        const token = store.state.token;
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }

        // 设置画面loading
        store.commit('changeLoading', true);
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// 对响应数据做点什么
Axios.interceptors.response.use((response) => {
    // 好像token不对,那就先去登录页面看看
    if (typeof response.data.code !== 'undefined') {
        router.push('/login');
    }
    // 结束画面loading
    store.commit('changeLoading', false);
    return response;
},  (error: any) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default Axios;
