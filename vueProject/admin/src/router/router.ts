/**
 * @Description: 路由配置
 * @Author: shenxf
 * @Date: 2019-04-20 21:10:19
 */
import VueRouter from 'vue-router'

// 导入对应的路由组件
const login = () => import('../pages/login/login.vue');
const Main = () => import('../pages/main/main.vue');
const articleList = () => import('../pages/articleManager/articleList/articleList.vue'); // 按需加载组件，懒加载，官方推荐
const addArticle = () => import('../pages/articleManager/addArticle/addArticle.vue');
const addCollection = () => import('../pages/collectionManager/addCollection/addCollection.vue');
const collectionList = () => import('../pages/collectionManager/collectionList/collectionList.vue');
const addTalk = () => import('../pages/talkManager/addTalk/addTalk.vue');
const talkList = () => import('../pages/talkManager/talkList/talkList.vue');

// 3. 创建路由对象
var router = new VueRouter({
    mode: 'history',

    // 配置路由规则
    routes: [
        {
            path: '/login',
            component: login
        },
        {
            path: '/',
            component: Main,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    redirect: 'home'
                },
                {
                    path: 'home',
                    component: articleList
                },
                {
                    path: 'articleList',
                    component: articleList
                },
                {
                    path: 'addArticle',
                    component: addArticle,
                },
                {
                    path: 'addCollection',
                    component: addCollection
                },
                {
                    path: 'collectionList',
                    component: collectionList
                },
                {
                    path: 'addTalk',
                    component: addTalk
                },
                {
                    path: 'talkList',
                    component: talkList
                },
            ]
        },
    ],
    // linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
});

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        const username = sessionStorage.getItem('username');
        // if (!auth.loggedIn()) {
        // 检查是否登录状态， 现在默认是登录状态
        if (username !== "ok") {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next();
        }
    } else {
        next(); // 确保一定要调用 next()
    }
});

// 把路由对象暴露出去
export default router