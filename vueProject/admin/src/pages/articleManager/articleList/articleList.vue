<!--
 * @Description: 文章列表
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'文章管理'" :lastName="'文章列表'" />
        <div class="blog-content">
            <a-spin :spinning="spinning">
                <a-table bordered :dataSource="dataSource" :columns="columns">
                    <router-link slot="title-dt" slot-scope="text, record" :to="`updateArticle/${record.id}`" >{{ text }}</router-link>
                    <span  slot="type" slot-scope="text">{{ text | typeFormat }}</span>
                    <template slot="operation" slot-scope="text, record">
                        <a-popconfirm v-if="dataSource.length" title="确定要删除吗?" @confirm="() => onDelete(record.key)">
                            <a href="javascript:;">删除</a>
                        </a-popconfirm>
                    </template>
                </a-table>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Table, Popconfirm, Spin, Message } from "ant-design-vue";
import TaskBar from '../../../components/taskBar.vue';
import axios from 'axios';
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(Spin);
Vue.use(Message);

@Component({
    components: {
        TaskBar
    },
    filters: {
        typeFormat: function(data) {
            switch (data) {
                case 1:
                    return '原创'
                    break;
                case 2:
                    return '转载'
                    break;
                case 3:
                    return '翻译'
                    break;
                default:
                    // 没有处理
                    return ''
            }
        }
    }
})
export default class ArticleList extends Vue {

    data() {
        return {
            spinning: false,
            dataSource: [],
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
                title: '类型',
                dataIndex: 'type',
                scopedSlots: {
                    customRender: 'type'
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
                    customRender: 'operation'
                },
            }]
        }
    };

    created() {
        // 设置加载
        this.spinning = true;

        // 请求表格数据
        axios.get('get-articles').then(res => {
            console.log(res);
            if (res.data.status === 1) {
                this.dataSource = res.data.info;
            }
        }).catch((resion: any) => {
            Message.error('数据取得异常');
        }).finally(()=>{
            this.spinning = false;
        });
    };

    /**
     * @description: 删除记录
     * @param {String} key - 删除的记录 
     */
    private onDelete(key: String): void {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.key !== key)
    }
}
</script>