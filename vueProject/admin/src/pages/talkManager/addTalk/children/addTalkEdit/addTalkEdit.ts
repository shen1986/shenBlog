import { Form, Button, Icon, Upload, Input } from 'ant-design-vue';
import { Vue, Component } from 'vue-property-decorator';
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Input);

@Component
export default class AddTalkEdit extends Vue {

    private form: any = {};

    private created(): void {
        this.form = this.$form.createForm(this);
    }

    private handleSubmit(e: any) {
        e.preventDefault();
        this.form.validateFields((err: any, values: any) => {
            if (!err) {
                //   console.log('Received values of form: ', values);
            }
        });
    }

    private handleChange(e: any) {
        // asdfasdf
    }
}
