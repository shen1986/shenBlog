<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="add-article">
        <TaskBar :firstName="'文章管理'" :lastName="'文章追加'" />
        <div class="blog-content" >
            <ArticleOp ref="op" />
            <Editor ref="edit" />
            <a-button type="primary" @click="handleClick">提交</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TaskBar from '../../../components/taskBar.vue';
import Editor from '../../../components/editor.vue';
import ArticleOp from './children/articleOp';
import { Button, Message } from 'ant-design-vue';
Vue.use(Button);
Vue.use(Message);

@Component({
    components: {
        TaskBar,
        ArticleOp,
        Editor
    }
})
export default class AddArticle extends Vue {

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
}
</script>

<style lang="less">
@import "../../../styles/pages/addArticle.less";
</style>
