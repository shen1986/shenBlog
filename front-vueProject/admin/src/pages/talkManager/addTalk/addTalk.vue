<!--
 * @Description: 说说添加
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'说说管理'" :lastName="'说说添加'" />
        <div class="blog-content">
            <a-spin :spinning="$store.state.spinning">
                <AddTalkEdit ref="edit" />
                <a-button type="primary" @click="handleClick">提交</a-button>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts" src="./addTalk.ts">
</script>

<style lang="less">
@import './addTalk.less';
</style>

