<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="add-collection">
        <TaskBar :firstName="'收藏管理'" :lastName="'收藏追加'" />
        <div class="blog-content" >
            <CollectionOp ref="op" />
            <Editor ref="edit" />
            <a-button type="primary" @click="handleClick">提交</a-button>
        </div>
    </div>
</template>

<script lang="ts" src="./addCollection.ts">
</script>

<style lang="less">
</style>
