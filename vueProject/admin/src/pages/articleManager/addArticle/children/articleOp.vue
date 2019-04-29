<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <a-spin :spinning="spinning">
        <a-form
            layout="inline"
            :form="form"
        >
            <a-form-item
                label="文章标题"
            >
                <a-input
                    v-decorator="[
                        'title',
                        {
                            rules: [{ required: true, message: '请输入标题！' }],
                        }
                    ]"
                    style="width: 100%"
                >
                    <a-select
                        slot="addonBefore"
                        v-decorator="[
                            'type',
                            { initialValue: '0' }
                        ]"
                        style="width: 70px"
                    >
                        <a-select-option value="0">原创</a-select-option>
                        <a-select-option value="1">转载</a-select-option>
                        <a-select-option value="2">翻译</a-select-option>
                    </a-select>
                </a-input>
            </a-form-item>
            <a-form-item
                label="文章标签"
            >
                <a-input
                    v-decorator="[
                        'tag',
                        {rules: [{ required: true, message: '请输入文章标签，以逗号分隔' }]}
                    ]"
                    placeholder="文章标签"
                >
                </a-input>
            </a-form-item>
            <a-form-item
                label="文章分类"
            >
                <a-select 
                    style="width: 100px"
                    v-decorator="[
                        'category',
                        {rules: [{ required: true, message: '请选择分类！' }]}
                    ]"
                >
                    <a-select-option v-for="item in categories" :key="item.id" :value="item.id">
                        {{item.theme}}
                    </a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item
                label="文章格式"
            >
                <a-select 
                    style="width: 120px"
                    v-decorator="[
                        'MarkdownType',
                        {rules: [{ required: true, message: '请选择分类！' }]}
                    ]"
                >
                    <a-select-option value="0">富文本</a-select-option>
                    <a-select-option value="1">Markdown</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-spin>
</template>

<script lang="ts">
import { Form, Button, Icon, Input, Select, Spin } from 'ant-design-vue';
import { Vue, Component, Prop } from "vue-property-decorator";
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Select);
Vue.use(Spin);

@Component
export default class ArticleOp extends Vue {

    data() {
        return {
            spinning: false,
            categories: [],
            hasErrors: function hasErrors (fieldsError) {
                return Object.keys(fieldsError).some(field => fieldsError[field]);
            },
            form: this.$form.createForm(this)
        }
    }

    created() {
        // 画面loading
        this.spinning = true;

        // 取得文章分类
        this.$axios.get('get-categories').then(res => {
            if (res.data.status === 1) {
                this.categories = res.data.info;
            }
        }).catch((resion: any) => {
            Message.error('数据取得异常');
        }).finally(()=>{
            this.spinning = false;
        });
    }

    /**
     * @description: 当触碰title输入框后，如果输入内容不对，则报错
     */
    private titleError(): void {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('title') && getFieldError('title');
    }

    /**
     * @description: 当触碰tag输入框后，如果输入内容不对，则报错
     */
    private tagError(): void {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('tag') && getFieldError('tag');
    }

    /**
     * @description: 父提交按钮触发事件
     * @return: 表单值，或则表单验证错误的信息
     */
    public handleSubmit (): any {
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
}
</script>