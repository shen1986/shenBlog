/**
 * @Description: js
 * @Author: shenxf
 * @Date: 2019-04-30 21:09:17
 */
import { Form, Button, Icon, Input } from 'ant-design-vue';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);

@Component
export default class CollectionOp extends Vue {

    @Prop() private gatherInfo!: object;

    private form: any = null;

    private created(): void {
        this.form = this.$form.createForm(this);
    }

    /**
     * @description: 监视gatherInfo变化
     * @param {any} val - 变化后gatherInfo
     * @param {any} oldVal - 变化前gatherInfo
     */
    @Watch('gatherInfo')
    private onChildChanged(val: any, oldVal: any): void {
        this.form.setFieldsValue({
            title: val.title,
            tag: val.tag,
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
}
