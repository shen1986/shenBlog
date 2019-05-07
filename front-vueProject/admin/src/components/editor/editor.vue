<!--
 * @Description: 富文本
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <a-row class="quill-editor">
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor 
            class="editor"
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
        </quill-editor>
    </a-row>
</template>

<script lang="ts" src="./editor.ts">
</script>

<style lang="less">
@import "./editor.less";
</style>
