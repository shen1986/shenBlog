<!--
 * @Description: 标签组件
 * @Author: shenxf
 * @Date: 2019-04-23 09:55:09
 -->
<template>
    <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>{{firstName}}</a-breadcrumb-item>
        <a-breadcrumb-item>{{lastName}}</a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script lang="ts">
import { Breadcrumb } from 'ant-design-vue';
import { Vue, Component, Prop } from "vue-property-decorator";
Vue.use(Breadcrumb);

@Component
export default class TaskBar extends Vue {
    @Prop() firstName!: string;
    @Prop() lastName!: string;
}
</script>

<style lang="less" scoped>

</style>
