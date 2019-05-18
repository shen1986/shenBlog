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
## 测出的问题
- iPhone手机看不到菜单
    + 重写了导航栏
- 检索条件输入后检索结果没什么变化
    + 画面渲染有点问题
- 点右侧tag出来的结果也是全数据
    + 画面渲染有点问题
- 搜索框按回车没反应
    + 添加keyup事件