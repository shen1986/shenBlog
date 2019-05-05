import { Vue, Component, Prop } from 'vue-property-decorator';
import { Button } from 'ant-design-vue';
import TaskBar from '../../../components/taskBar/taskBar.vue';
import AddTalkEdit from './children/addTalkEdit/addTalkEdit.vue';
Vue.use(Button);

@Component({
    components: {
        TaskBar,
        AddTalkEdit,
    },
})
export default class AddTalk extends Vue {

}
