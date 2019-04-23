<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'文章管理'" :lastName="'文章追加'" />
        <div class="blog-content" >
            <ArticleOp />
            <ArticleEdit />
            <a-button type="primary">提交</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TaskBar from '../../../components/taskBar.vue';
import ArticleEdit from './children/articleEdit';
import ArticleOp from './children/articleOp';
import { Button } from 'ant-design-vue';
Vue.use(Button);

@Component({
    components: {
        TaskBar,
        ArticleOp,
        ArticleEdit
    }
})
export default class AddArticle extends Vue {

}
</script>

<style scoped>
</style>
