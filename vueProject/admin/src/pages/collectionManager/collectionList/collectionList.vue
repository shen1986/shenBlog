<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'收藏管理'" :lastName="'收藏列表'" />
        <div class="blog-content">
            <a-table bordered :dataSource="dataSource" :columns="columns">
                <router-link slot="title-dt" slot-scope="text, record" :to="`updateCollection/${record.id}`">{{text}}</router-link>
                <template slot="operation" slot-scope="text, record">
                    <a-popconfirm v-if="dataSource.length" title="确定要删除吗?" @confirm="() => onDelete(record.key)">
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Table, Popconfirm } from "ant-design-vue";
import TaskBar from '../../../components/taskBar.vue';
Vue.use(Table);
Vue.use(Popconfirm);

@Component({
    components: {
        TaskBar
    }
})
export default class CollectionList extends Vue {

    data() {
        return {
            dataSource: [{
                key: '1',
                id: '1',
                title: 'java提高篇-----详解java的四舍五入与保留位1',
                tag: 'java',
                created_at: '2019-04-23',
            }],
            columns: [{
                title: 'ID',
                dataIndex: 'id',
            }, {
                title: '标题',
                dataIndex: 'title',
                scopedSlots: {
                    customRender: 'title-dt'
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
                    customRender: 'operation'
                },
            }]
        }
    }

    /**
     * @description: 删除
     * @param {String} key - 删除行key
     */
    private onDelete(key: String): void {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.key !== key)
    }
}
</script>

<style>
</style>
