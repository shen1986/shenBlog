<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <a-form
            layout="inline"
            :form="form"
        >
            <a-form-item
                label="文章标题"
            >
                <a-input
                    placeholder="请输入标题"
                    v-decorator="[
                        'title',
                        {rules: [{ required: true, message: '请输入标题！' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="文章标签"
            >
                <a-input
                    v-decorator="[
                        'tag',
                        {rules: [{ required: true, message: '请输入文章标签!' }]}
                    ]"
                    placeholder="文章标签"
                >
                </a-input>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { Form, Button, Icon, Input } from 'ant-design-vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);

@Component
export default class CollectionOp extends Vue {

    /**
     * @description: 父提交按钮触发事件
     * @return: 表单值，或则表单验证错误的信息
     */
    public handleSubmit(): any {
        return new Promise((resolved, reject) => {
            this.form.validateFields((err, values) => {
                if (!err) {
                    resolved(values);
                } else {
                    reject(err);
                }
            });
        });
    }

    private data() {
        return {
            hasErrors: function hasErrors(fieldsError) {
                return Object.keys(fieldsError).some(field => fieldsError[field]);
            },
            form: this.$form.createForm(this),
        };
    }
}
</script>