<!--
 * @Description: 富文本
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="markdown-wrap">
        <a-row>
            <a-checkbox @change="onChange">预览</a-checkbox>
        </a-row>
        <a-row gutter="16">
            <a-col :xs="preview ? 13 : 24">
                <!-- <ContentEditable handleChange={this.handleChange} content={this.props.content} /> -->
                <ContentEditable  @handleChange="handleChange" :parentContent="content" />
            </a-col>
            <a-col :xs="preview ? 11 : 0">
                <!-- <div className="markdown-preview" ref={(ele) => {this.ele = ele}}></div> -->
                <div class="markdown-preview" v-html="ele"></div>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Row, Col, Checkbox } from 'ant-design-vue';
import ContentEditable from './contentEditable.vue';
import marked from 'marked';
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);

@Component({
    components: {
        ContentEditable,
    },
})
export default class Markdown extends Vue {
    private data(): void {
        return {
            preview: false,
            ele: '',
            content: '',
        };
    }

    private mounted(): void {
        // 给Markdown的代码区域设置颜色
        marked.setOptions({
			highlight: (code) => {
				return require('highlight.js').highlightAuto(code).value;
			},
		});
    }

    /**
     * @description: 是否显示preview
     * @param {any} e - Event
     */
    private onChange(e: any): void {
        this.preview = e.target.checked;
    }

    /**
     * @description: 当发生变化的时候转换成markdown模式
     * @param {String} content - markdown内容
     */
    private handleChange(content: string): void {
		// this.props.onChange(content);

		// if(window.localStorage) {
		// 	localStorage.markdown_content = content;
		// }

        // console.log(content);

        if (this.preview) {
            this.ele = marked(content);
        }
	}
}
</script>

<style lang="less">
@import "../styles/components/markdown.less";
</style>
