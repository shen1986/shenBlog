import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Row, Col, Checkbox } from 'ant-design-vue';
import ContentEditable from '../contentEditable/contentEditable.vue';
// import marked from 'marked';
const marked = require('marked');
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);

@Component({
    components: {
        ContentEditable,
    },
})
export default class Markdown extends Vue {
    @Prop() private pContent!: string;
    private preview = false;
    private ele = '';
    // 这是个共通属性 - 调用者会使用
    public content = '## 1';

    /**
     * @description: 监视pContent
     * @param {any} val - 变化后路由
     * @param {any} oldVal - 变化前路由
     */
    @Watch('pContent')
    private onChildChanged(val: string, oldVal: string): void {
        this.content = val;
    }

    private mounted(): void {
        // 给Markdown的代码区域设置颜色
        marked.setOptions({
            highlight: (code: any) => {
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
