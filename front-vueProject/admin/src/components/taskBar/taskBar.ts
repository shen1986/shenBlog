import { Breadcrumb } from 'ant-design-vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
Vue.use(Breadcrumb);

@Component
export default class TaskBar extends Vue {
    @Prop() private firstName!: string;
    @Prop() private lastName!: string;
}