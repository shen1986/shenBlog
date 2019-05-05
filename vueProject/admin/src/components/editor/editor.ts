import { Vue, Component, Prop } from 'vue-property-decorator';
import { Row } from 'ant-design-vue';
Vue.use(Row);
const quillEditor = require('vue-quill-editor').quillEditor;
// import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

@Component({
    components: {
        quillEditor,
    },
})
export default class Editor extends Vue {

    // 富文本内容 - 调用者会使用
    public content = '';
    private editorOption = { placeholder: '请输入内容' };

    get editor() {
        const myQuillEditor: any = this.$refs.myQuillEditor;
        return myQuillEditor.quill;
    }
}
