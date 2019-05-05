import { Vue, Component } from 'vue-property-decorator';
import CollectionOp from './children/collectionOp/collectionOp.vue';
import TaskBar from '../../../components/taskBar/taskBar.vue';
import Editor from '../../../components/editor/editor.vue';
import { Button, message } from 'ant-design-vue';
Vue.use(Button);

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
