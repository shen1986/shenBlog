<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="add-collection">
        <TaskBar :firstName="'收藏管理'" :lastName="'收藏追加'" />
        <div class="blog-content" >
            <CollectionOp />
            <CollectionEdit />
            <a-button type="primary" @click="handleClick">提交</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CollectionEdit from './children/collectionEdit';
import CollectionOp from './children/collectionOp';
import TaskBar from '../../../components/taskBar.vue';
import { Button } from 'ant-design-vue';
Vue.use(Button);


@Component({
    components: {
        CollectionEdit,
        CollectionOp,
        TaskBar
    }
})
export default class AddCollection extends Vue {
  
}
</script>

<style lang="less">
@import '../../../styles/pages/addCollection.less';
</style>
