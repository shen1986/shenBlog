<!--
 * @Description: 说说添加子画面
 * @Author: shenxf
 * @Date: 2019-04-26 21:40:58
 -->
<template>
    <div>
        <a-form
            :form="form"
            @submit="handleSubmit"
        >
            <a-form-item
                label="图片上传"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
            >
                <a-upload 
                    v-decorator="['upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    }]"
                    :beforeUpload="beforeUpload"
                    :remove="remove"
                    listType="picture"
                >
                    <a-button>
                        <a-icon type="upload" />
                        Upload
                    </a-button>
                </a-upload>
            </a-form-item>

            <a-form-item
                label="说说内容"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
            >
                <a-textarea 
                    placeholder="请输入说说内容"
                    v-decorator="[
                        'detail',
                        {rules: [{ required: true, message: '请输入说说内容！' }]}
                    ]"
                    :autosize="{ minRows: 3 }"
                />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" src="./addTalkEdit.ts">
</script>
