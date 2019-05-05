<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <a-spin :spinning="spinning">
        <a-form
            layout="inline"
            :form="form"
        >
            <a-form-item
                label="文章标题"
            >
                <a-input
                    v-decorator="[
                        'title',
                        {
                            rules: [{ required: true, message: '请输入标题！' }],
                        }
                    ]"
                    style="width: 100%"
                >
                    <a-select
                        slot="addonBefore"
                        v-decorator="[
                            'type',
                            { initialValue: '0' }
                        ]"
                        style="width: 70px"
                    >
                        <a-select-option value="0">原创</a-select-option>
                        <a-select-option value="1">转载</a-select-option>
                        <a-select-option value="2">翻译</a-select-option>
                    </a-select>
                </a-input>
            </a-form-item>
            <a-form-item
                label="文章标签"
            >
                <a-input
                    v-decorator="[
                        'tag',
                        { rules: [{ required: true, message: '请输入文章标签，以逗号分隔' }] }
                    ]"
                    placeholder="文章标签"
                >
                </a-input>
            </a-form-item>
            <a-form-item
                label="文章分类"
            >
                <a-select 
                    style="width: 100px"
                    v-decorator="[
                        'category',
                        { rules: [{ required: true, message: '请选择分类！' }] }
                    ]"
                >
                    <a-select-option v-for="item in categories" :key="item.id" :value="item.id">
                        {{item.theme}}
                    </a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item
                label="文章格式"
            >
                <a-select 
                    style="width: 120px"
                    v-decorator="[
                        'MarkdownType',
                        { initialValue: '0' },
                        { rules: [{ required: true, message: '请选择分类！' }] }
                    ]"
                    @change="handleChange"
                >
                    <a-select-option value="0">富文本</a-select-option>
                    <a-select-option value="1">Markdown</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-spin>
</template>

<script lang="ts" src="./articleOp.ts">
</script>