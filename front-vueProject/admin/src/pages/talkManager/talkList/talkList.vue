<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'说说管理'" :lastName="'说说列表'" />
        <div class="blog-content">
            <a-spin :spinning="$store.state.spinning">
                <a-table bordered :dataSource="dataSource" :columns="columns" rowKey="id">
                    <router-link slot="detail" slot-scope="text, record" :to="`updateTalk/${record.id}`">{{ text }}</router-link>
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

<script lang="ts" src="./talkList.ts">
</script>

<style>
</style>