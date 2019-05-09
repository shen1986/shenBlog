/**
 * @Description: 文章列表
 * @Author: shenxf
 * @Date: 2019-05-07 19:49:12
 */
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
    filters: {
        typeFormat: (data: number) => {
            switch (data) {
                case 0:
                    return '原创';
                case 1:
                    return '转载';
                case 2:
                    return '翻译';
                default:
                    // 没有处理
                    return '';
            }
        },
    },
})
export default class ArticleList extends Vue {

    private dataSource = [];
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
        title: '类型',
        dataIndex: 'type',
        scopedSlots: {
            customRender: 'type',
        },
    }, {
        title: '标签',
        dataIndex: 'tag',
    }, {
        title: '创建时间',
        dataIndex: 'created_at',
    }, {
        title: '访问量',
        dataIndex: 'views',
    }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: {
            customRender: 'operation',
        },
    }];

    private created(): void {
        this.getArtilces();
    }

    /**
     * @description: 取得文章信息
     * @param {boolean} isLoad - 是否需要取消加载
     */
    private getArtilces(): void {

        // 请求表格数据
        this.$axios.get('get-articles')
            .then((res: any) => {

                if (res.data.status === 1) {
                    this.dataSource = res.data.info;
                }

            })
            .catch((resion: any) => {
                message.error('数据取得异常');
            });
    }

    /**
     * @description: 删除记录
     * @param {String} id - 删除的记录的id
     */
    private onDelete(id: string): void {
        this.$axios.get(`article-delete/${id}`)
            .then((res: any) => {

                if (res.data.status === 1) {
                    // 数据再取得
                    this.getArtilces();
                }

            })
            .catch((resion: any) => {
                message.error('数据删除异常');
            });
    }
}
