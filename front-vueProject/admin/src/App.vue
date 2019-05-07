<!--
 * @Description: 主模版
 * @Author: shenxf
 * @Date: 2019-04-20 21:05:11
 -->
<template>
    <a-locale-provider :locale="locale">
        <router-view></router-view>
    </a-locale-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { LocaleProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
Vue.use(LocaleProvider);

@Component
export default class App extends Vue {
    private data() {
        return {
            locale: zhCN,
        };
    }
}
</script>

<style lang="less">
// 全局样式    
@import "styles/commons/base.less";
</style>