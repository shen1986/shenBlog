import { Vue, Component, Prop } from 'vue-property-decorator';
import { Button, Spin, message } from 'ant-design-vue';
import TaskBar from '../../../components/taskBar/taskBar.vue';
import AddTalkEdit from './children/addTalkEdit/addTalkEdit.vue';
Vue.use(Button);
Vue.use(Spin);

@Component({
    components: {
        TaskBar,
        AddTalkEdit,
    },
})
export default class AddTalk extends Vue {

    private talkInfo = {};

    private created(): void {
        // 更新画面
        if (this.$route.params.id) {
            this.getGossip(this.$route.params.id);
        }
    }

    /**
     * @description: 取得说说情报
     * @param {string} id - 说说的id
     * @param {boolean} isLoad - 是否需要取消loading
     */
    private getGossip(id: string): void {
        this.$axios.get(`gossip/${id}`)
            .then((res: any) => {
                if (res.data.status === 1) {
                    this.talkInfo = res.data.info;
                    const edit: any = this.$refs.edit;
                    edit.form.setFieldsValue({ detail: res.data.info.detail});
                }
            })
            .catch((resion: any) => {
                message.error('数据取得异常');
            });
    }

    /**
     * @description: 提交按钮
     * @param {any} e - event
     */
    private handleClick(e: any): void {
        const edit: any = this.$refs.edit;

        edit.handleSubmit()
            .then((res: any) => {
                // console.log(res);
                const info = {
                    ...res,
                };

                return this.$axios.post('gossip-submit', info);
            }).then((res: any) => {
                if (res.data.status === 1) {
                    message.success('提交成功');
                } else {
                    message.error(res.data.msg);
                }
            }).catch((err: any) => {
                // console.log(typeof err);
                if (err instanceof Error) {
                    message.error(err.message);
                } else {
                    message.error('表单输入有误');
                }
            });
    }
}
