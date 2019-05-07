import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
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
    @Prop() private pContent!: string;
    private content: string = '';
    private editorOption = { placeholder: '请输入内容' };

    /**
     * @description: 监视pContent
     * @param {any} val - 变化后路由
     * @param {any} oldVal - 变化前路由
     */
    @Watch('pContent')
    private onChildChanged(val: string, oldVal: string): void {
        this.content = val;
    }

    get editor() {
        const myQuillEditor: any = this.$refs.myQuillEditor;
        return myQuillEditor.quill;
    }
}
