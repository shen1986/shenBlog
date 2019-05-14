# docker 容器使用

## 前台页面部署方法
- `docker build -t bk/blog .`
- `docker run -d -p 3000:3000 --name=myblog bk/blog`

## 后台页面部署方法
- `docker build -t bk/admin .`
- `docker run -d -p 8080:8080 --name=myadmin bk/admin`