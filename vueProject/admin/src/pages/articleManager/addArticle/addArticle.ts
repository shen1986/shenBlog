/**
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-05-05 20:02:52
 */
import { Vue, Component } from 'vue-property-decorator';
import TaskBar from '../../../components/taskBar/taskBar.vue';
import Editor from '../../../components/editor/editor.vue';
import Markdown from '../../../components/markdown/markdown.vue';
import ArticleOp from './children/articleOp/articleOp.vue';
import { Button, message, Spin } from 'ant-design-vue';
Vue.use(Button);
Vue.use(Spin);

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
    private content = '';
    private spinning = false;
    private articleInfo = {};

    private created(): void {
        // 更新画面
        if (this.$route.params.id) {
            this.spinning = true;
            this.getArticle(this.$route.params.id);
        }
    }

    /**
     * @description: 取得文章情报
     * @param {boolean} isLoad - 是否要停止loading 
     */
    private getArticle(id: string,isLoad: boolean = true): void {
        // 取得文章情报
        this.$axios.get(`article/${id}`).then((res: any) => {
            if (res.data.status === 1) {
                this.articleInfo = res.data.info;
            }
        }).catch((resion: any) => {
            console.log(resion);
            message.error('数据取得异常');
        }).finally(() => {
            if (isLoad) {
                this.spinning = false;
            }
        });
    }

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
