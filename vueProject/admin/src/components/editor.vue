<!--
 * @Description: 富文本
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <a-row class="quill-editor">
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor 
            class="editor"
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
        </quill-editor>
    </a-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Row } from 'ant-design-vue';
Vue.use(Row);
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

@Component({
    components: {
        quillEditor
    }
})
export default class Editor extends Vue {

    data() {
        return {
            content: '',
            editorOption:{ placeholder: '请输入内容' }
        }
    };
    
    get editor() {
        return this.$refs.myQuillEditor.quill;
    };
}
</script>

<style lang="less">
@import "../styles/components/editor.less";
</style>
