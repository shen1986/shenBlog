<!--
 * @Description: 文章添加
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="add-article">
        <TaskBar :firstName="'文章管理'" :lastName="'文章追加'" />
        <div class="blog-content" >
            <ArticleOp ref="op" @typeChange="typeChange"/>
            <Markdown v-if="markdown" :content="content" @change="handleChange" />
            <Editor v-else="markdown" ref="edit" />
            <!-- <Markdown content={content} onChange={this.handleChange} preview={preview} /> -->
            <a-button type="primary" @click="handleClick">提交</a-button>
        </div>
    </div>
</template>

<script lang="ts" src="./addArticle.ts">
</script>

<style lang="less">
@import "./addArticle.less";
</style>
