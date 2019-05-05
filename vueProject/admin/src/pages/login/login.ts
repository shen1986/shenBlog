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
            this.checkForm();
        }
    }

    private checkForm(): void {
        this.pregress = true;
        this.percent = 0;
        this.form.validateFields((err: any, values: any) => {
            this.percent = 50;
            if (!err) {
                const redirect: any = this.$route.query.redirect;
                this.percent = 70;
                this.$axios.post('/toLogin', values).then((res: any) => {
                    if (res.data.status === 1) {
                        if (redirect) {
                            this.percent = 100;
                            this.$router.push(redirect);
                        } else {
                            this.$router.push('/');
                        }

                        // session缓存
                        sessionStorage.setItem('username', 'ok');
                    } else {
                        message.error(res.data.msg);
                    }
                }).finally(() => {
                    this.pregress = false;
                });
            } else {
                // console.log(err);
            }
        });
    }
}
