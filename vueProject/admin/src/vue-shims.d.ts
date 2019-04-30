/**
 * @Description: 自定义模块支持
 * @Author: shenxf
 * @Date: 2018-03-24 23:04:44
 */
import Vue from 'vue';
declare module 'vue/types/vue' {
    interface Vue {
        $axios: any,
    }
}