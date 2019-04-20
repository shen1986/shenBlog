<!--
 * @Description: 主模版
 * @Author: shenxf
 * @Date: 2019-04-20 21:05:11
 -->
<template>
    <div>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <helloComponent :name="name" :initialEnthusiasm="5" />
        <h1>Hello Decorator Component</h1>
        <hello-decorator-component :name="name" :initialEnthusiasm="5" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import helloComponent from './components/Hello.vue';
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
    },
});
</script>

<style>

</style>