/**
 * @Description: 
 * @Author: shenxf
 * @Date: 2018-03-24 23:04:44
 */
import Vue from "vue";
import app from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false

// 引入蚂蚁式样
Vue.use(Antd)

let v = new Vue({
    el: "#app",
    render: c => c(app),
});
