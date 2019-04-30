<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-26 21:40:58
 -->
<template>
    <div>
        <a-form
            :form="form"
            @submit="handleSubmit"
        >
            <a-form-item
                label="图片上传"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 24 }"
            >
                <a-upload 
                    action="//jsonplaceholder.typicode.com/posts/" 
                    :defaultFileList="defaultFileList"
                >
                    <a-button>
                        <a-icon type="upload" />
                        Upload
                    </a-button>
                </a-upload>
            </a-form-item>

            <a-form-item
                label="说说内容"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 24 }"
            >
                <a-textarea 
                    placeholder="Autosize height based on content lines" autosize 
                />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { Form, Button, Icon, Upload, Input } from 'ant-design-vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
Vue.use(Form);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Input);

@Component
export default class AddTalkEdit extends Vue {

    private data(): object {
        return {
            hasErrors: function hasErrors(fieldsError) {
                return Object.keys(fieldsError).some(field => fieldsError[field]);
            },
            form: this.$form.createForm(this),
        };
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