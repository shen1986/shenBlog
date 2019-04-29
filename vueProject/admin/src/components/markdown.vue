<!--
 * @Description: 富文本
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <a-row class="marked">
    </a-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Row } from 'ant-design-vue';
import marked from 'marked';
Vue.use(Row);

@Component({
    components: {
        marked
    }
})
export default class Markdown extends Vue {
    data() {
        return {
        }
    }
}
</script>

<style lang="less">
@import "../styles/components/markdown.less";
</style>
