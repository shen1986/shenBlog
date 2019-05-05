<!--
 * @Description: 主模版
 * @Author: shenxf
 * @Date: 2019-04-20 21:05:11
 -->
<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider collapsible v-model="collapsed">
            <div class="logo">Shenxf个人博客管理端</div>
            <a-menu theme="dark" :defaultSelectedKeys="['/articleList']" ref="myLayout" mode="inline" @click="handleClick">
                <a-sub-menu key="articleManager">
                    <span slot="title">
                        <a-icon type="file" />
                        <span>文章管理</span>
                    </span>
                    <a-menu-item key="/articleList">文章列表</a-menu-item>
                    <a-menu-item key="/addArticle">文章添加</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="collectionManager">
                    <span slot="title">
                        <a-icon type="inbox" />
                        <span>收藏管理</span>
                    </span>
                    <a-menu-item key="/collectionList">收藏列表</a-menu-item>
                    <a-menu-item key="/addCollection">收藏添加</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="talkManager">
                    <span slot="title">
                        <a-icon type="share-alt" />
                        <span>说说管理</span>
                    </span>
                    <a-menu-item key="/talkList">说说列表</a-menu-item>
                    <a-menu-item key="/addTalk">说说添加</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding:0 15px;text-align: right;">
                欢迎你，{{ username }}
                <a href="javascript:;" @click="logout">退出</a>
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                © 2019 小沈
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" src="./main.ts">
</script>

<style lang="less">
@import "./main.less";
</style>