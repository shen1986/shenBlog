/**
 * @Description: 添加或则更新文章
 * @Author: shenxf
 * @Date: 2019-05-05 20:02:52
 */
import { Vue, Component } from 'vue-property-decorator';
import TaskBar from '../../../components/taskBar/taskBar.vue';
import Editor from '../../../components/editor/editor.vue';
import Markdown from '../../../components/markdown/markdown.vue';
import ArticleOp from '../../../components/articleOp/articleOp.vue';
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
export default class UpdateArticle extends Vue {

    private markdown = false;
    private id: string = '';

    private created(): void {
        // 更新画面
        if (this.$route.params.id) {
            this.getArticle(this.$route.params.id);
        }
    }

    /**
     * @description: 取得文章情报
     * @param {boolean} isLoad - 是否要停止loading
     */
    private getArticle(id: string): void {
        // 取得文章情报
        this.$axios.get(`article/${id}`)
            .then((res: any) => {

                if (res.data.status === 1) {
                    const info = res.data.info;
                    this.id = info.id;

                    this.changeMarkdown(res.data.info.type);

                    this.$store.commit('saveContent', res.data.info.body);
                    const op: any = this.$refs.op;
                    op.form.setFieldsValue({
                        title: info.title,
                        type: info.type,
                        tag: info.tag,
                        category: info.category,
                        markdown: info.markdown,
                    });
                }

            })
            .catch((resion: any) => {
                message.error('数据取得异常');
            });
    }

    /**
     * @description: 文章格式变更时更新输入内容部分
     * @param {number} type - 现在选择的文章格式
     */
    private typeChange(type: number = 0): void {
        this.changeMarkdown(type);
        this.$store.commit('saveContent', '');
    }

    /**
     * @description: 根据文章格式显示markdown或富文本
     * @param {number} type - 文章格式
     */
    private changeMarkdown(type: number) {
        if (type === 0) {
            this.markdown = false;
        } else if (type === 1) {
            this.markdown = true;
        }
    }

    /**
     * @description: 提交按钮
     * @param {any} e - event
     */
    private handleClick(e: any): void {

        const op: any = this.$refs.op;

        if (this.$store.state.mdContent.trim().length === 0) {
            message.error('请输入文章内容');
            return;
        }

        // 验证并提交
        op.handleSubmit()
            .then((res: any) => {
                const info = {
                    ...res,
                    content: this.$store.state.mdContent,
                    id: this.id,
                };

                // 更新请求
                return this.$axios.post('/article-submit', info);

            })
            .then((result: any) => {

                if (result.data.status === 1) {
                    this.$router.push('/articleList');
                    message.success('提交成功！');
                } else {
                    message.error(result.data.msg);
                }

            })
            .catch((error: any) => {
                message.error(error.message);
            });
    }
}
