<!--
 * @Description: 后台管理系统说明
 * @Author: shenxf
 * @Date: 2018-03-24 23:04:44
 -->
# 个人博客后台管理系统使用指南

- 调试阶段
```shell
npm run dev
```

- 编译
```shell
npm run build
```
## 备忘
- 解决 mac 系统 npm install 各种权限问题。
    + https://www.jianshu.com/p/6c67a456654b
- webpack 打包优化
    + http://www.cnblogs.com/vvjiang/p/9327903.html
- docker重新启动docker
    + `docker exec -it staticweb service nginx reload`
- nginx 开启 gzip 的坑
    + https://blog.csdn.net/hl_java/article/details/81946228
- koa 开启 gzip 
    + koa-compress