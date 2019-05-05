import { Layout, Menu, Icon, LocaleProvider } from 'ant-design-vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
// 这里吐槽一句，vue的antd按需加载真特么丑陋，一点也不优雅，还浪费了我大把的时间。感觉全部直接引用更好
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(LocaleProvider);

@Component
export default class App extends Vue {

    private collapsed = false;
    private username = '';

    private created(): void {
        this.username = 'shenxf';
    }

    /**
     * 点击事件
     */
    private handleClick(e: any): void {
        this.$router.push(e.key);
        // console.log('myLayout',this.$refs.myLayout);
        // this.$refs.myLayout.selectedKeys = ['/articleList'];
    }

    /**
     * @description: 注销处理
     */
    private logout(): void {

        // 删除session
        sessionStorage.removeItem('username');

        // 取到登录页面
        this.$router.push('/login');
    }
}
