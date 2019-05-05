<!--
 * @Description: 收藏列表
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

<script lang="ts" src="./collectionList.ts">
</script>

<style>
</style>
