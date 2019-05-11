/**
 * @Description: 说说添加表单
 * @Author: shenxf
 * @Date: 2019-05-08 20:25:27
 */
import { Form, Button, Icon, Upload, Input, message } from 'ant-design-vue';
import { Vue, Component } from 'vue-property-decorator';
import commonTools from '../../tools/commonTools';
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

    /**
     * @description: 文件列表最多能表示一个文件
     * @param {any} e - 当前选择文件信息
     * @return: 文件列表
     */
    private normFile(e: any): any {
        if (Array.isArray(e)) {
            return e;
        }
        if (e) {
            e.fileList = [e.file];
        }
        return e && e.fileList;
    }

    /**
     * @description: 阻止图片上传,改用base64先存在本地。
     * @param {any} file - 当前文件
     * @param {any} fileList - 文件的集合（未使用）
     * @return: 固定 false 阻止图片上传
     */
    private beforeUpload(file: any, fileList: any): boolean {
        commonTools.getBase64(file, (img: any, imageBase64: any) => {

            // 大于200k就报错
            if (file.size / 1024 <= 200) {
                const suffix = this.getSuffix(file.name);
                const tmpFile = {
                    uid: file.uid,
                    name: file.name,
                    status: 'done',
                    base64: imageBase64,
                };
                this.form.setFieldsValue({ upload: [tmpFile] });
            } else {
                message.error('上传的图片不能大于200k');
                this.form.setFieldsValue({ upload: [] });
            }

        });
        return false;
    }

    /**
     * @description: 截取文件名后缀
     * @param {string} fileName - 文件名
     * @return: 后缀
     */
    private getSuffix(fileName: string): string {
        // 后缀获取
        let suffix = '';
        try {
            const flieArr = fileName.split('.');
            suffix = flieArr[flieArr.length - 1];
        } catch (err) {
            suffix = '';
        }
        return suffix;
    }

    /**
     * @description: 移除
     * @param {any} file - 文件信息
     */
    private remove(file: any): void {
        this.form.setFieldsValue({upload: []});
    }
}
