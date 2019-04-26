<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div>
        <TaskBar :firstName="'说说管理'" :lastName="'说说列表'" />
        <div class="blog-content">
            <AddTalkEdit />
            <a-button type="primary" @click="handleClick">提交</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Button } from 'ant-design-vue';
import TaskBar from '../../../components/taskBar.vue';
import AddTalkEdit from './children/addTalkEdit';
Vue.use(Button);

@Component({
    components: {
        TaskBar,
        AddTalkEdit
    }
})
export default class AddTalk extends Vue {
  
}
</script>

<style>
</style>
