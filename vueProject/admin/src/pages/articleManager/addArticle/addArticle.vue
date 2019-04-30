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
            <Editor v-if="!markdown" ref="edit" />
            <Markdown v-if="markdown" :content="content" @change="handleChange" />
            <!-- <Markdown content={content} onChange={this.handleChange} preview={preview} /> -->
            <a-button type="primary" @click="handleClick">提交</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TaskBar from '../../../components/taskBar.vue';
import Editor from '../../../components/editor.vue';
import Markdown from '../../../components/markdown.vue';
import ArticleOp from './children/articleOp';
import { Button, Message } from 'ant-design-vue';
Vue.use(Button);
Vue.use(Message);

@Component({
    components: {
        TaskBar,
        ArticleOp,
        Editor,
        Markdown
    }
})
export default class AddArticle extends Vue {

    data() {
        return {
            markdown: false
        }
    }

    /**
     * @description: 文章格式变更时更新输入内容部分
     * @param {String} type - 现在选择的文章格式 
     */
    private typeChange(type: String = "0"): void {
        console.log('type',type === "1");
        if (type === "0") {
            this.markdown = false;
        } else if (type === "1") {
            this.markdown = true;
        }
    }

    /**
     * @description: 提交按钮
     * @param {any} e - event
     */
    private handleClick(e: any): void{
        if ( this.$refs.edit.content.trim().length === 0 ) {
            Message.error('请输入文章内容');
            return;
        }

        alert(this.$refs.edit.content);

        this.$refs.op.handleSubmit().then(res => {
            console.log(typeof res);
            alert('提交了'); 
        }).catch( err => {
            console.log(typeof err);
            alert('错误了'); 
        });
    }

    private handleChange():void {
        
    }
}
</script>

<style lang="less">
@import "../../../styles/pages/addArticle.less";
</style>
