<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'文章管理'" :lastName="'文章追加'" />
        <div class="blog-content" >
            addArticle
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TaskBar from '../../../components/taskBar.vue';

@Component({
    components: {
        TaskBar: TaskBar
    }
})
export default class AddArticle extends Vue {

}
</script>

<style scoped>
</style>
