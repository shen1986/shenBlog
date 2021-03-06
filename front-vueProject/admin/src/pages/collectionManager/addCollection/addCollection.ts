/**
 * @Description: 收藏添加js
 * @Author: shenxf
 * @Date: 2019-05-05 20:02:52
 */
import { Vue, Component } from 'vue-property-decorator';
import CollectionOp from '../../../components/collectionOp/collectionOp.vue';
import TaskBar from '../../../components/taskBar/taskBar.vue';
import Editor from '../../../components/editor/editor.vue';
import { Button, message, Spin } from 'ant-design-vue';
Vue.use(Button);
Vue.use(Spin);

@Component({
    components: {
        Editor,
        CollectionOp,
        TaskBar,
    },
})
export default class AddCollection extends Vue {

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

        op.handleSubmit()
            .then((res: any) => {
                const info = {
                    ...res,
                    id: '',
                    content: this.$store.state.mdContent,
                };

                return this.$axios.post('gather-submit', info);
            }).then((res: any) => {
                if (res.data.status === 1) {
                    message.success('提交成功');
                } else {
                    message.error(res.data.msg);
                }
            }).catch((err: any) => {
                message.error(err.message);
            });
    }
}
