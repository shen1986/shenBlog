/**
 * @Description: 登陆画面js
 * @Author: shenxf
 * @Date: 2019-05-05 20:02:52
 */
import { Vue, Component } from 'vue-property-decorator';
import { Form, Input, Button, Icon, message, Progress } from 'ant-design-vue';
Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Progress);

@Component
export default class Login extends Vue {

    private form: any = {};
    private percent: number = 0;
    private pregress: boolean = false;

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
            this.percent = 0;
            this.checkForm();
        }
    }

    /**
     * @description: 验证登陆用户
     */
    private checkForm(): void {
        this.pregress = true;
        this.percent = 30;
        this.form.validateFields((err: Error, values: any) => {
            this.percent = 50;
            if (!err) {
                const redirect: any = this.$route.query.redirect;
                this.percent = 70;
                this.$axios.post('/toLogin', values).then((res: any) => {
                    this.percent = 100;
                    if (res.data.status === 1) {
                        // 必须先设置session缓存， 不然会被路由守卫弹回来
                        this.$store.commit('saveToken', res.data.token);
                        if (redirect) {
                            this.$router.push(redirect);
                        } else {
                            this.$router.push('/');
                        }
                    } else {
                        message.error(res.data.msg);
                    }
                }).catch((error: any) => {
                    message.error(error.message);
                }).finally(() => {
                    this.pregress = false;
                    this.percent = 0;
                });
            } else {
                message.error(err.message);
                this.pregress = false;
                this.percent = 0;
            }
        });
    }
}
