<!--
 * @Description: 前端页面使用说明
 * @Author: shenxf
 * @Date: 2019-04-13 20:39:44
 -->
# 前端页面使用说明

- 使用前提
    + 安装Nodejs
    + 安装mysql
- 安装mysql，创建数据库，执行blog.sql文件创建表。
    + config表必须有2条数据 name：'intro' 的自我介绍和 name：'view_count' 访问次数
- 添加本地配置文件 在文件加`src/common/config/config.ts`,内容如下。
```javascript
const config = {

    // 数据库相关
    host: 数据库连接地址,
    user: 用户名,
    password: 密码,
    database: 数据库名,

    // 服务器启动端口
    port: 3000,
};

```
- 进入blog 执行下面的操作
```shell
npm install
npm run build
npm start
```
- 打开游览器，输入`localhost:3000`,就可以查看网页
- 如果是开发阶段，请使用
```shell
npm run watch
```

## 问题
1. 当初为了SEO，大部分画面都是全页面渲染的，导致页面加载时间比较慢。
- 其实需要SEO的只有文章详情页面其他页面应该用局部渲染。这是个失策。由于改动较大，不会在去改正了。
- 翻页用的是局部渲染。所以加载较快。

1. 代码没有进行压缩
- 如果是真实项目，肯定会进行压缩，但是我这个项目就不压缩了。