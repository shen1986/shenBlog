<!--
 * @Description: 登录页面
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="login">
        <h2 class="title">小沈的个人博客管理系统</h2>
        <a-form
            class="login-form"
            :form="form"
            @submit="handleSubmit"
        >
            <a-form-item
                label="用户名"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 15 }"
            >
                <a-input
                    v-decorator="[
                        'userName',
                        {rules: [{ required: true, message: '请输入用户名' }]}
                    ]"
                >
                    <a-icon
                        slot="prefix"
                        type="user"
                        class="icon-color"
                    />
                </a-input>
            </a-form-item>
            <a-form-item
                label="密码"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 15 }"
            >
                 <a-input
                    type="password"
                    v-decorator="[
                        'password',
                        {rules: [{ required: true, message: '请输入密码' }]}
                    ]"
                >
                    <a-icon
                        slot="prefix"
                        type="lock"
                        class="icon-color"
                    />
                </a-input>
            </a-form-item>
            <a-form-item
                :wrapper-col="{ span: 12, offset: 5 }"
            >
                <a-button
                    type="primary"
                    html-type="submit"
                >
                    登录
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Form, Input, Button, Icon } from 'ant-design-vue';
import axios from 'axios';
Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);

@Component
export default class Login extends Vue {

    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this)
        };
    };

    /**
     * @description: 登录
     * @param {any} e - Event 
     */
    private handleSubmit (e: any): void {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.get('/users').then(res => {
                    console.log(res);
                });
                this.$router.push('/');
            } else {
                console.log(err);
            }
        });
    };
}
</script>

<style lang="less">
@import "../../styles/pages/login.less";
</style>
