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
                <template slot="operation" slot-scope="text, record">
                    <a-popconfirm v-if="dataSource.length" title="确定要删除吗?" @confirm="() => onDelete(record.key)">
                        <a href="javascript:;">Delete</a>
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
  dataSource = [{
        key: '1',
        id: '1',
        title: 'java提高篇-----详解java的四舍五入与保留位1',
        type: '原创',
        tag: 'java',
        created_at: '2019-04-23',
        views: '1',
    }];

    columns = [{
        title: 'ID',
        dataIndex: 'id',
    }, {
        title: '标题',
        dataIndex: 'title',
    }, {
        title: '类型',
        dataIndex: 'type',
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
            customRender: 'operation'
        },
    }];

    private onDelete(key: String): void {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.key !== key)
    }
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
