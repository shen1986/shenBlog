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
                <a-input
                    defaultValue="请输入标题"
                    v-decorator="[
                        'title',
                        {rules: [{ required: true, message: '请输入标题！' }]}
                    ]"
                />
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
        </a-form>
    </div>
</template>

<script lang="ts">
import { Form, Button, Icon, Input } from 'ant-design-vue';
import { Vue, Component, Prop } from "vue-property-decorator";
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);

@Component
export default class CollectionOp extends Vue {

    data() {
        return {
            hasErrors: function hasErrors (fieldsError) {
                return Object.keys(fieldsError).some(field => fieldsError[field]);
            },
            form: this.$form.createForm(this)
        }
    }

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