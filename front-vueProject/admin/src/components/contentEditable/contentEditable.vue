<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-29 17:33:10
 -->
<template>
    <div class="content-editable"
        contentEditable = "true"
        @input="emitChange"
        @blur="emitChange"
        v-html="localConent" >
    </div>
</template>

<script lang="ts" src="./contentEditable.ts">
</script>


<style lang="less" scoped>
@import './contentEditable.less';
</style>

