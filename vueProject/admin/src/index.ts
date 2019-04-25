/**
 * @Description: 主入口文件
 * @Author: shenxf
 * @Date: 2018-03-24 23:04:44
 */
import Vue from "vue";
import app from "./App.vue";

// 不阻止启动生产消息
Vue.config.productionTip = false;

// 1.1 导入路由的包
import VueRouter from 'vue-router';
// 1.2 安装路由
Vue.use(VueRouter);
// 1.3 导入自己的 router.js 路由模块
import router from './router/router';

// 导入模拟数据
import Mock from './mock';
Mock.init()

let v = new Vue({
    el: "#app",
    router, // 1.4 挂载路由对象到 VM 实例上
    render: c => c(app),
});
