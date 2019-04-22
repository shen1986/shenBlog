/**
 * @Description: 路由配置
 * @Author: shenxf
 * @Date: 2019-04-20 21:10:19
 */
import VueRouter from 'vue-router'

// 导入对应的路由组件
const hello = () => import('../components/Hello.vue'); // 按需加载组件，懒加载，官方推荐


// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    { path: '/', redirect: '/hello' },
    { path: '/hello', component: hello },
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router