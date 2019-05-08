import { Form, Button, Icon, Upload, Input } from 'ant-design-vue';
import { Vue, Component } from 'vue-property-decorator';
import commonTools from '../../../../../tools/commonTools';
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

    private normFile(e: any) {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    /**
     * @description: 阻止图片上传,改用base64先存在本地。
     * @param {any} file
     * @param {any} fileList
     * @return: 固定 false
     */
    private beforeUpload(file: any, fileList: any): boolean {
        commonTools.getBase64(file, (img: any, imageBase64: any) => {
            // console.log(img);
            // console.log(imageBase64);

            // console.log(fileList);
        });
        return false;
    }
}
