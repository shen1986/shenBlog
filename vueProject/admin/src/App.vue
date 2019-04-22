<!--
 * @Description: 主模版
 * @Author: shenxf
 * @Date: 2019-04-20 21:05:11
 -->
<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo">Shenxf个人博客管理端</div>
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline" @click="handleClick">
        <a-sub-menu key="articleManager">
          <span slot="title">
            <a-icon type="file"/>
            <span>文章管理</span>
          </span>
          <a-menu-item key="/articleList">文章列表</a-menu-item>
          <a-menu-item key="/addArticle">文章添加</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="collectionManager">
          <span slot="title">
            <a-icon type="inbox"/>
            <span>收藏管理</span>
          </span>
          <a-menu-item key="/collectionList">收藏列表</a-menu-item>
          <a-menu-item key="/addCollection">收藏添加</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="talkManager">
          <span slot="title">
            <a-icon type="share-alt"/>
            <span>说说管理</span>
          </span>
          <a-menu-item key="/talkList">说说列表</a-menu-item>
          <a-menu-item key="/addTalk">说说添加</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding:0 15px;text-align: right;">
        欢迎你，shenxf
        <a href="#">退出</a>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>{{firstName}}</a-breadcrumb-item>
          <a-breadcrumb-item>{{lastName}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">Ant Design ©2019 Created by Ant UED</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Layout, Menu, Breadcrumb, Icon } from "ant-design-vue";
import { Vue, Component, Prop } from "vue-property-decorator";
// 这里吐槽一句，vue的antd按需加载真特么丑陋，一点也不优雅，还浪费了我大把的时间。感觉全部直接引用更好
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Icon);

@Component
export default class App extends Vue {
  // data 属性
  collapsed = false;

  firstName = "";
  lastName = "";

  /**
   *
   */
  private handleClick(e: any): void {
    console.log(e);
    this.firstName = e.keyPath[1];
    this.lastName = e.keyPath[0];
    this.$router.push(e.key);
  }
}
</script>

<style lang="less" scoped>
@import "styles/app.less";
</style>