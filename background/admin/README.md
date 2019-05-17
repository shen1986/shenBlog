<!--
 * @Description: 博客后台后端
 * @Author: shenxf
 * @Date: 2019-04-28 16:39:12
 -->
# 博客后台后端 使用说明

- 使用前提
    + 安装Nodejs
    + 安装mysql
- 添加本地配置文件 在文件加`src/common/config/config.ts`,内容如下。
```javascript
const config = {

    // 数据库相关
    host: 数据库连接地址,
    user: 用户名,
    password: 密码,
    database: 数据库名,

    // 服务器启动端口
    port: 8080,

    // token秘钥
    tokenSerect: 'xxxxxxxxxx',  // 密钥，不能丢

    // sha256秘钥
    sha256Serect: 'xxxxx',

    // sessionKey
    sessionKey: 'xxxxxx'
};
};

```
- 进入admin 执行下面的操作
```shell
npm install
npm run build
npm start
```
- 打开游览器，输入`localhost:8080`,就可以查看网页
- 如果是开发阶段，请使用
```shell
npm run watch
```

## 参照
- [vue+koa2+token登陆验证](https://www.jianshu.com/p/406301bead0c)
- [各种验证方式说明](http://www.cnblogs.com/hongdiandian/p/9294970.html)

## 测试出的问题
- 检索条件输入后检索结果没什么变化
- 点右侧tag出来的结果也是全数据