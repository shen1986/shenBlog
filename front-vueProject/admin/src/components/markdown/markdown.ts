import { Vue, Component, Watch } from 'vue-property-decorator';
import { Row, Col, Checkbox } from 'ant-design-vue';
import ContentEditable from '../contentEditable/contentEditable.vue';
const hljs = require('highlight.js/lib/highlight');
const javascript = require('highlight.js/lib/languages/javascript');
const css = require('highlight.js/lib/languages/css');
const shell = require('highlight.js/lib/languages/shell');
import 'highlight.js/styles/atom-one-dark.css';
// import marked from 'marked';
const marked = require('marked');
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('shell', shell);

@Component({
    components: {
        ContentEditable,
    },
})
export default class Markdown extends Vue {
    private preview = false;
    private ele = '';

    private mounted(): void {
        // 给Markdown的代码区域设置颜色
        marked.setOptions({
            highlight: (code: any) => {
                return hljs.highlightAuto(code).value;
            },
        });
    }

    /**
     * @description: 是否显示preview
     * @param {any} e - Event
     */
    private onChange(e: any): void {
        this.preview = e.target.checked;
        this.ele = marked(this.$store.state.mdContent);
    }

    /**
     * @description: 监视仓库里mdContent变化
     * @param {any} val - 变化后mdContent
     * @param {any} oldVal - 变化前mdContent
     */
    @Watch('$store.state.mdContent')
    private onChildChanged(val: string, oldVal: string): void {
        if (this.preview) {
            this.ele = marked(val);
        }
    }
}
