import { Vue, Component } from 'vue-property-decorator';
import TaskBar from '../../../components/taskBar/taskBar.vue';
import Editor from '../../../components/editor/editor.vue';
import Markdown from '../../../components/markdown/markdown.vue';
import ArticleOp from './children/articleOp/articleOp.vue';
import { Button, message } from 'ant-design-vue';
Vue.use(Button);

@Component({
    components: {
        TaskBar,
        ArticleOp,
        Editor,
        Markdown,
    },
})
export default class AddArticle extends Vue {

    private markdown = false;

    /**
     * @description: 文章格式变更时更新输入内容部分
     * @param {String} type - 现在选择的文章格式
     */
    private typeChange(type: string = '0'): void {
        // console.log('type',type === "1");
        if (type === '0') {
            this.markdown = false;
        } else if (type === '1') {
            this.markdown = true;
        }
    }

    /**
     * @description: 提交按钮
     * @param {any} e - event
     */
    private handleClick(e: any): void {

        const edit: any = this.$refs.edit;
        const op: any = this.$refs.op;

        if (edit.content.trim().length === 0) {
            message.error('请输入文章内容');
            return;
        }

        alert(edit.content);

        op.handleSubmit().then((res: any) => {
            // console.log(typeof res);
            alert('提交了');
        }).catch((err: any) => {
            // console.log(typeof err);
            alert('错误了');
        });
    }

    private handleChange(): void {
        // asdf
    }
}
