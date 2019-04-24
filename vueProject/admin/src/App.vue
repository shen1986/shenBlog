<!--
 * @Description: 主模版
 * @Author: shenxf
 * @Date: 2019-04-20 21:05:11
 -->
<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {

}
</script>

<style lang="less">
// 全局样式    
@import "styles/commons/base.less";
</style>