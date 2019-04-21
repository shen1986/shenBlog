<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2018-03-24 23:04:44
 -->
<!-- src/components/Hello.vue -->
<template>
    <div>
        <div class="greeting">Hello </div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            enthusiasm: 1,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
