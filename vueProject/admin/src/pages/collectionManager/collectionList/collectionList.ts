import { Vue, Component } from 'vue-property-decorator';
import { Table, Popconfirm, Spin, message } from 'ant-design-vue';
import TaskBar from '../../../components/taskBar/taskBar.vue';
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(Spin);

@Component({
    components: {
        TaskBar,
    },
})
export default class CollectionList extends Vue {

    // 加载标识
    private spinning = false;

    // 表格数据
    private dataSource = [];

    // 表格结构
    private columns = [{
        title: 'ID',
        dataIndex: 'id',
    }, {
        title: '标题',
        dataIndex: 'title',
        scopedSlots: {
            customRender: 'title-dt',
        },
    }, {
        title: '标签',
        dataIndex: 'tag',
    }, {
        title: '创建时间',
        dataIndex: 'created_at',
    }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: {
            customRender: 'operation',
        },
    }];

    private created(): void {
        this.getCollection();
    }

    /**
     * @description: 取得收藏列表
     */
    private getCollection(isLoad: boolean = true): void {

        // 设置加载
        if (isLoad) {
            this.spinning = true;
        }

        // 请求表格数据
        this.$axios.get('get-gather').then((res: any) => {
            if (res.data.status === 1) {
                this.dataSource = res.data.info;
            }
        }).catch((resion: any) => {
            message.error('数据取得异常');
        }).finally(() => {
            if (isLoad) {
                this.spinning = false;
            }
        });
    }

    /**
     * @description: 删除
     * @param {String} id - 删除行key
     */
    private onDelete(id: string): void {
        this.spinning = true;
        this.$axios.get(`gather-delete/${id}`)
            .then((res: any) => {

                if (res.data.status === 1) {
                    const dataSource = [...this.dataSource];
                    this.dataSource = dataSource.filter((item: any) => item.id !== id);
                    // 数据再取得
                    // this.getCollection(false);
                }

            }).catch((resion: any) => {
                message.error('数据删除异常');
            }).finally(() => {
                this.spinning = false;
            });
    }
}
