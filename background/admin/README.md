<!--
 * @Description: 博客后台后端
 * @Author: shenxf
 * @Date: 2019-04-28 16:39:12
 -->
# 博客后台后端 使用说明

- 构建中
- 主要是用来返回json数据，后台管理的所有后端操作在这里完成。

## 参照
- [vue+koa2+token登陆验证](https://www.jianshu.com/p/406301bead0c)
- [各种验证方式说明](http://www.cnblogs.com/hongdiandian/p/9294970.html)

## 踩过的坑
- async函数里面this指向出问题了。
    + async的语法类似于 new Promise(function(){ 这里面的代码 })，所以this指向不对了。
    + 这个东西太恶心了，koa里面我基本用的都是async函数，所以没办为了统一全部改成箭头函数了。