# docker 容器使用
- 如果你绑定目录的话，请记得，如果有新的`node`组件导入的话，请到容器里执行`npm install`.

## 前台页面部署方法
- `docker build -t bk/blog .`
- `docker run -d -p 3000:3000 --name=myblog bk/blog`

## 后台后端部署方法
- `docker build -t bk/admin .`
- `docker run -d -p 8080:8080 --name=myadmin bk/admin`

## 后台前端部署方法
- 找个服务器`nginx`,`apache`,`tomcat`等，把服务开起来，把编译好的vue代码放进去。别忘了开Gzip。
- 但是记得编译之前请改下`tools`文件里面的`axios.ts`文件。
```javascript
if (process.env.NODE_ENV === 'development') {
    Axios.defaults.baseURL = 'http://127.0.0.1:8080';
} else {
    Axios.defaults.baseURL = '后台后端部署的地址和端口'; // <- 就改这里。
}
```