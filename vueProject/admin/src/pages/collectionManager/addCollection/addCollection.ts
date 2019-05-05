/**
 * @Description: 收藏添加js
 * @Author: shenxf
 * @Date: 2019-05-05 20:02:52
 */
import { Vue, Component } from 'vue-property-decorator';
import CollectionOp from './children/collectionOp/collectionOp.vue';
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

    private spinning = false;
    private gatherInfo = {};

    private created(): void {
        // 更新画面
        if (this.$route.params.id) {
            this.spinning = true;
            this.getGather(this.$route.params.id);
        }
    }

    /**
     * @description: 取得收藏情报
     * @param {string} id - 收藏id
     * @param {boolean} isLoad - 是否要取消load 
     */
    private getGather(id: string, isLoad: boolean = true): void {
        this.$axios.get(`gather/${id}`).then((res: any) => {
            if (res.data.status === 1) {
                this.gatherInfo = res.data.info;
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
}
