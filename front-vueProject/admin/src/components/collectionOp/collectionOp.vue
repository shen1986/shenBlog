<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <a-form
            layout="inline"
            :form="form"
        >
            <a-form-item
                label="文章标题"
            >
                <a-input
                    placeholder="请输入标题"
                    v-decorator="[
                        'title',
                        {rules: [{ required: true, message: '请输入标题！' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="文章标签"
            >
                <a-input
                    v-decorator="[
                        'tag',
                        {rules: [{ required: true, message: '请输入文章标签!' }]}
                    ]"
                    placeholder="文章标签"
                >
                </a-input>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" src="./collectionOp.ts">
</script>