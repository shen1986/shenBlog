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
            @submit="handleSubmit"
        >
            <a-form-item
                :validate-status="userNameError() ? 'error' : ''"
                :help="userNameError() || ''"
                label="文章标题"
            >
                <a-input-group 
                    compact
                    v-decorator="[
                        'title',
                        {rules: [{ required: true, message: '请输入标题！' }]}
                    ]"
                >
                    <a-select defaultValue="0">
                        <a-select-option value="0">原创</a-select-option>
                        <a-select-option value="1">转载</a-select-option>
                        <a-select-option value="2">翻译</a-select-option>
                    </a-select>
                    <a-input style="width: 50%" defaultValue="请输入标题" />
                </a-input-group>
            </a-form-item>
            <a-form-item
                :validate-status="passwordError() ? 'error' : ''"
                :help="passwordError() || ''"
                label="文章标签"
            >
                <a-input
                    v-decorator="[
                    'password',
                    {rules: [{ required: true, message: 'Please input your Password!' }]}
                    ]"
                    placeholder="文章标签"
                >
                </a-input>
            </a-form-item>
            <a-form-item
                :validate-status="passwordError() ? 'error' : ''"
                :help="passwordError() || ''"
                label="文章分类"
            >
                <a-select defaultValue="lucy" style="width: 100px" @change="handleChange">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item
                :validate-status="passwordError() ? 'error' : ''"
                :help="passwordError() || ''"
                label="文章格式"
            >
                <a-select defaultValue="lucy" style="width: 100px" @change="handleChange">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { Form, Button, Icon, Input, Select } from 'ant-design-vue';
import { Vue, Component, Prop } from "vue-property-decorator";
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Select);

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Component
export default class ArticleOp extends Vue {
    hasErrors = hasErrors;
    form = this.$form.createForm(this);

    mounted () {
        console.log('nextTick',this.$nextTick);
        // this.$nextTick(() => {
        // // To disabled submit button at the beginning.
        // this.form.validateFields();
        // });
    }

    userNameError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    }
    
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    }

    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    handleChange (e) {

    }
}
</script>