<!--
 * @Description: 文章列表
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'文章管理'" :lastName="'文章列表'" />
        <div class="blog-content">
            <a-spin :spinning="$store.state.spinning">
                <a-table bordered :dataSource="dataSource" :columns="columns" rowKey="id">
                    <router-link slot="title-dt" slot-scope="text, record" :to="`updateArticle/${record.id}`" >{{ text }}</router-link>
                    <span  slot="type" slot-scope="text">{{ text | typeFormat }}</span>
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

<script lang="ts" src="./articleList.ts">
</script>