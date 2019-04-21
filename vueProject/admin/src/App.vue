<!--
 * @Description: 主模版
 * @Author: shenxf
 * @Date: 2019-04-20 21:05:11
 -->
<template>
    <Layout>
        <Header>header</Header>
        <Layout>
            <Sider>left sidebar</Sider>
            <Content>main content</Content>
        </Layout>
        <Footer>footer</Footer>
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import helloComponent from "./components/Hello.vue";
import HelloDecoratorComponent from "./components/HelloDecorator.vue";

export default Vue.extend({
  data() {
    return {
      name: "World"
    };
  },
  components: {
    helloComponent,
    HelloDecoratorComponent
  }
});
</script>

<style>
</style>