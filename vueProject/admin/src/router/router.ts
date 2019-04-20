/**
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-20 21:10:19
 */
import App from '../App.vue';


// const notFound = () => import(/* webpackChunkName: "index" */ '@views/common/404')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
}]
