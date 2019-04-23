<!--
 * @Description: 文章列表
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'文章管理'" :lastName="'文章列表'" />
        <div class="blog-content" >
            <a-table bordered :dataSource="dataSource" :columns="columns">
                <template slot="operation" slot-scope="text, record">
                    <a-popconfirm
                    v-if="dataSource.length"
                    title="Sure to delete?"
                    @confirm="() => onDelete(record.key)">
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
        TaskBar: TaskBar
    }
})
export default class ArticleList extends Vue {
    dataSource = [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }];
    
    columns = [{
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        scopedSlots: { customRender: 'name' },
      }, {
        title: 'age',
        dataIndex: 'age',
      }, {
        title: 'address',
        dataIndex: 'address',
      }, {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }];

    
    private onDelete (key: String): void {
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
