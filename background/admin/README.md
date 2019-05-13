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

## 踩过的坑
- async函数里面this指向出问题了。
    + async的语法类似于 new Promise(function(){ 这里面的代码 })，所以this指向不对了。
    + 这个东西太恶心了，koa里面我基本用的都是async函数，所以没办为了统一全部改成箭头函数了。