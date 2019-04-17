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
- 修改dynamic-koa/blog/models/db.js文件中的mysql配置。
- 进入dynamic-koa/blog 执行下面的操作
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
