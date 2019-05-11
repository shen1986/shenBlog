/**
 * @Description: 说说添加
 * @Author: shenxf
 * @Date: 2019-05-08 20:25:27
 */
import { Vue, Component } from 'vue-property-decorator';
import { Button, Spin, message } from 'ant-design-vue';
import TaskBar from '../../../components/taskBar/taskBar.vue';
import AddTalkEdit from '../../../components/addTalkEdit/addTalkEdit.vue';
Vue.use(Button);
Vue.use(Spin);

@Component({
    components: {
        TaskBar,
        AddTalkEdit,
    },
})
export default class AddTalk extends Vue {

    /**
     * @description: 提交按钮
     * @param {any} e - event
     */
    private handleClick(e: any): void {
        const edit: any = this.$refs.edit;

        edit.handleSubmit()
            .then((res: any) => {
                const info = {
                    ...res,
                    id: '',
                };

                return this.$axios.post('gossip-submit', info);
            })
            .then((res: any) => {
                if (res.data.status === 1) {
                    message.success('提交成功');
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch((err: any) => {
                // console.log(typeof err);
                if (err instanceof Error) {
                    message.error(err.message);
                } else {
                    message.error('表单输入有误');
                }
            });
    }
}
