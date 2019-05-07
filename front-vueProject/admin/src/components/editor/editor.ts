/**
 * @Description:
 * @Author: shenxf
 * @Date: 2019-05-07 19:49:12
 */
import { Vue, Component, Watch } from 'vue-property-decorator';
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

    private content: string = '';
    private editorOption = { placeholder: '请输入内容' };

    private created(): void {
        this.content = this.$store.state.mdContent;
    }

    /**
     * @description: 监视pContent
     * @param {any} val - 变化后路由
     * @param {any} oldVal - 变化前路由
     */
    @Watch('content')
    private onContentChanged(val: string, oldVal: string): void {
        this.$store.commit('saveContent', val);
    }

    get editor() {
        const myQuillEditor: any = this.$refs.myQuillEditor;
        return myQuillEditor.quill;
    }
}
