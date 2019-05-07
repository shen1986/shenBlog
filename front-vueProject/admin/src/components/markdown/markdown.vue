<!--
 * @Description: 富文本
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="markdown-wrap">
        <a-row>
            <a-checkbox @change="onChange">预览</a-checkbox>
        </a-row>
        <a-row :gutter="16">
            <a-col :xs="preview ? 13 : 24">
                <ContentEditable />
            </a-col>
            <a-col :xs="preview ? 11 : 0">
                <div class="markdown-preview" v-html="ele"></div>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" src="./markdown.ts">
</script>

<style lang="less">
@import "./markdown.less";
</style>
