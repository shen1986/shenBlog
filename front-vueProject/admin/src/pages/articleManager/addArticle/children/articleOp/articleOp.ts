import { Form, Button, Icon, Input, Select, Spin, message } from 'ant-design-vue';
import { Vue, Component } from 'vue-property-decorator';
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Select);
Vue.use(Spin);

@Component
export default class ArticleOp extends Vue {

    private categories: any[] = [];
    private form: any = {};

    private created(): void {
        this.form = this.$form.createForm(this);

        // 取得文章分类
        this.$axios.get('get-categories')
            .then((res: any) => {
                if (res.data.status === 1) {
                    this.categories = res.data.info;

                    this.form.setFieldsValue({
                        category: this.categories.length === 0 ? '' : this.categories[0].id,
                    });
                }
            })
            .catch((resion: any) => {
                message.error('数据取得异常');
            });
    }

    /**
     * @description: 父提交按钮触发事件
     * @return: 表单值，或则表单验证错误的信息
     */
    public handleSubmit(): any {
        return new Promise((resolved, reject) => {
            this.form.validateFields((err: any, values: any) => {
                if (!err) {
                    resolved(values);
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * @description: markdown下拉菜单
     * @param {any} value - 选择值
     */
    private handleChange(value: any): void {
        this.$emit('typeChange', value);
    }
}
