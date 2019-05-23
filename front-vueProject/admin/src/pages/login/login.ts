/**
 * @Description: 登陆画面js
 * @Author: shenxf
 * @Date: 2019-05-05 20:02:52
 */
import { Vue, Component } from 'vue-property-decorator';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'; // 这个样式必须引入
import { Form, Input, Button, message, Icon } from 'ant-design-vue';
Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);

@Component
class Login extends Vue {

    private form: any = {};

    private created(): void {
        this.form = this.$form.createForm(this);
    }

    /**
     * @description: 登录
     * @param {any} e - Event
     */
    private handleSubmit(e: any): void {
        e.preventDefault();

        this.checkForm();
    }

    /**
     * @description: 键盘回车事件响应
     * @param {any} e - event
     */
    private handleKeyup(e: any): void {
        if (e.keyCode === 13) {
            // this.percent = 0;
            this.checkForm();
        }
    }

    /**
     * @description: 验证登陆用户
     */
    private checkForm(): void {
        Nprogress.start();
        this.form.validateFields((err: Error, values: any) => {
            if (!err) {
                const redirect: any = this.$route.query.redirect;
                this.$axios.post('/toLogin', values).then((res: any) => {
                    if (res.data.status === 1) {
                        // 必须先设置session缓存， 不然会被路由守卫弹回来
                        this.$store.commit('saveToken', res.data.token);
                        if (redirect) {
                            this.$router.push(redirect);
                        } else {
                            this.$router.push('/home');
                        }
                    } else {
                        message.error(res.data.msg);
                    }
                }).catch((error: any) => {
                    message.error(error.message);
                }).finally(() => {
                    Nprogress.done();
                });
            } else {
                message.error(err.message);
                Nprogress.done();
            }
        });
    }
}

export default Login;