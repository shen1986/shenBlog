<!--
 * @Description: 富文本
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <a-row class="collection-edit">
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor 
            class="editor"
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
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
export default class CollectionEdit extends Vue {
    content = '<p>example content</p>';
    editorOption = {  };

    onEditorBlur(quill) {
        console.log('editor blur!', quill)
    };
    onEditorFocus(quill) {
        console.log('editor focus!', quill)
    };
    onEditorReady(quill) {
        console.log('editor ready!', quill)
    };
    onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html;
    };

    
    get editor() {
        return this.$refs.myQuillEditor.quill;
    }

    mounted() {
      console.log('this is current quill instance object', this.editor)
    };
}
</script>
