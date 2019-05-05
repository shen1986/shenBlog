<!--
 * @Description: 
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
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 24 }"
            >
                <a-upload 
                    action="//jsonplaceholder.typicode.com/posts/" 
                    :defaultFileList="defaultFileList"
                >
                    <a-button>
                        <a-icon type="upload" />
                        Upload
                    </a-button>
                </a-upload>
            </a-form-item>

            <a-form-item
                label="说说内容"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 24 }"
            >
                <a-textarea 
                    placeholder="Autosize height based on content lines" autosize 
                />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" src="./addTalkEdit.ts">
</script>