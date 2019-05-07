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

    private spinning = false;
    private talkInfo = {};

    private created(): void {
        // 更新画面
        if (this.$route.params.id) {
            this.spinning = true;
            this.getGossip(this.$route.params.id);
        }
    }

    /**
     * @description: 取得说说情报
     * @param {string} id - 说说的id
     * @param {boolean} isLoad - 是否需要取消loading
     */
    private getGossip(id: string, isLoad: boolean = true): void {
        this.$axios.get(`gossip/${id}`).then((res: any) => {
            if (res.data.status === 1) {
                this.talkInfo = res.data.info;
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

    }
}
