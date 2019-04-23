<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
        </quill-editor>

        <!-- Or manually control the data synchronization（或手动控制数据流）
        <quill-editor :content="content"
                        :options="editorOption"
                        @change="onEditorChange($event)">
        </quill-editor> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

@Component({
    components: {
        quillEditor
    }
})
export default class ArticleEdit extends Vue {
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

<style scoped>
</style>
