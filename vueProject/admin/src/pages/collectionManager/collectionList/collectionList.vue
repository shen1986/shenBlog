<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'收藏管理'" :lastName="'收藏列表'" />
        <div class="blog-content">
            <a-spin :spinning="spinning">
                <a-table bordered :dataSource="dataSource" :columns="columns" rowKey="id">
                    <router-link slot="title-dt" slot-scope="text, record" :to="`updateCollection/${record.id}`">{{text}}</router-link>
                    <template slot="operation" slot-scope="text, record">
                        <a-popconfirm v-if="dataSource.length" title="确定要删除吗?" @confirm="() => onDelete(record.id)">
                            <a href="javascript:;">删除</a>
                        </a-popconfirm>
                    </template>
                </a-table>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Table, Popconfirm, Spin, Message } from 'ant-design-vue';
import TaskBar from '../../../components/taskBar.vue';
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(Spin);
Vue.use(Message);

@Component({
    components: {
        TaskBar,
    },
})
export default class CollectionList extends Vue {

    private data(): object {
        return {

            // 加载标识
            spinning: false,

            // 表格数据
            dataSource: [],

            // 表格结构
            columns: [{
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
            }],
        };
    }

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
        this.$axios.get('get-gather').then(res => {
            if (res.data.status === 1) {
                this.dataSource = res.data.info;
            }
        }).catch((resion: any) => {
            Message.error('数据取得异常');
        }).finally(() => {
            if (isLoad) {
                this.spinning = false;
            }
        });
    }

    /**
     * @description: 删除
     * @param {String} key - 删除行key
     */
    private onDelete(key: string): void {
        this.spinning = true;
        this.$axios.get(`gather-delete/${id}`)
            .then(res => {

                if (res.data.status === 1) {
                    const dataSource = [...this.dataSource];
                    this.dataSource = dataSource.filter(item => item.key !== key);
                    // 数据再取得
                    // this.getCollection(false);
                }

            }).catch((resion: any) => {
                Message.error('数据删除异常');
            }).finally(() => {
                this.spinning = false;
            });
    }
}
</script>

<style>
</style>
