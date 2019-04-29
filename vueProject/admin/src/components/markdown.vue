<!--
 * @Description: 富文本
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="markdown-wrap">
        <a-row>
            <a-checkbox @change="onChange">Preview</a-checkbox>
        </a-row>
        <a-row gutter="16">
            <a-col :xs="preview ? 13 : 24">
                123123
                <!-- <ContentEditable handleChange={this.handleChange} content={this.props.content} /> -->
            </a-col>
            <a-col :xs="preview ? 11 : 0">
                456456
                <!-- <div className="markdown-preview" ref={(ele) => {this.ele = ele}}></div> -->
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Row, Col, Checkbox } from 'ant-design-vue';
import ContentEditable from './contentEditable.vue';
import marked from 'marked';
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);

@Component({
    components: {
        marked,
        ContentEditable
    }
})
export default class Markdown extends Vue {
    data() {
        return {
            preview: false
        }
    }

    /**
     * @description: 是否显示preview
     * @param {any} e - Event
     */
    private onChange(e: any): void {
        this.preview = e.target.checked;
    };
}
</script>

<style lang="less">
@import "../styles/components/markdown.less";
</style>
