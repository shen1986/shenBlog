<!--
 * @Description: 说明文件
 * @Author: shenxf
 * @Date: 2019-02-27 12:16:55
 -->
# 小沈的个人网站

展示自己的个人博客网站

## 契机和概要

- 经历了长时间的前端学习，想把自己的学习成果展现出来，所以想做一个展示自己水平的个人博客网站。	
一开始只要求能把成果做出来就行，后期可能着重点在画面的一些效果演示。	
网站内容主要是分享一些个人经历，和技术文案。	
预想的是前后台分离。后台主要提供接口和处理数据。前端主要是表示。

## 用到的技术：	//TODO

- 后端技术：Node.js
	+ 模板引擎： art-template
	+ Web 开发框架： koa2
- 前端技术：Vue，less, html
	+ 包管理工具: webpack
	+ 蚂蚁: Ant-Design
	+ 图标字体库: icomoon 
	+ 开源工具包：bootstrap
		* 原来的栅格是12，改了源代码把栅格改成24重新编译
- 部署：Docker
- 数据持久化：mysql

## 实施计划

- 前期调查：根据github上面的网站，做一个自己的页面设计，最好有原型图	
- 制作前台页面和后台静态页面	
- 设计表结构。	
- 开发阶段。	
- 调优阶段。	
- 发布。	
- 维护。	

## 具体实施		//TODO

- 前期调查	
	+ markdown文件的基本常用编写语法（图文并茂）。
		* [MD学习](https://www.cnblogs.com/liugang-vip/p/6337580.html)
	+ 参照网站查找。	
		* [参照网站1](https://segmentfault.com/u/yuanzm/articles)
		* [参照网站2](https://yisha0307.github.io/Portfolio-page/chenyisha.html)
		* [参照网站3](http://www.flqin.com/)
		* [fangzh](http://fangzh.top/)
	+ 原型图制作工具了解。	
		* [Axure工具下载](http://www.woshipm.com/it/319902.html)
		* [墨刀](https://modao.cc/) 它里面有很多都是现成的组件，直接布局拖动就好了
		* 由于上述的学习需要一些时间，偏离主题，暂时只用用一些简单的工具来制作草图。不过多浪费时间在这上面。等有时间了再来学习。
	+ 制定基础要件，明确要做哪些范围。	
		* 前台
			- 首页（logo）
				+ 轮播图。
				+ 最新文章
				+ 文章列表
			- 文章
				+ 文章列表
			- 归档
				+ 可按分类进行查询
			- 点滴
				+ 小标签页
			- 慢生活
				+ 生活点滴分享
		* 后台
			- 首页
				+ 系统信息 v1.0
			- 文章管理
				+ 文章列表
				+ 文章添加（富文本，markdown）
			- 收藏管理
				+ 收藏列表
				+ 收藏添加
			- 说说管理
				+ 说说列表
				+ 说说添加
			- 系统管理
	+ 前端的模板引擎用`art-template`，入门门槛较低。
	+ 代码风格和规约制定[MaintainableJavaScript](https://github.com/shen1986/MaintainableJavaScript)
	+ 基础工程创建。	（预计5月底6月初开始）
- 制作前台页面和后台静态页面
	+ 先做了一个自我介绍的模板html,用了art-template模板引擎。
		* [resume](https://github.com/shen1986/resume)
		* 发现一个动态较牛的简历，参照着做了下，稍后会做成公用模板[动态个人介绍](http://www.shenxf.com:3000/vue/)
	+ 又做了一个服务端渲染（有利于SEO）的个人介绍,用了EJS模板引擎。(没有使用express，比较简单的实现)
		* [resume-nodejs](https://github.com/shen1986/resume-nodejs)
	+ 除了翻页，前台页面基本做完了。
        * [前台博客页面TypeScript版](background/blog)
            - 翻页准备在后台页面做好之后再做，有数据好做点。
        * [Vue后台前端模板页面](front-vueProject/admin)

## 补充说明

- 标记TODO的地方以后会根据实际情况追加。	
- 一开始用http，最后要改成Https	
- 做2套画面，电脑和手机各一套，预计一年时间。先做PC端，手机端作为以后调优和维护的内容。	
- 预计访问量较低，不做分布式架构。
- 考虑到SEO,前台页面用html加模板引擎，后台页面用VUE
- PC端不做浏览器兼容。最新的IE，Google，FireFox基本能使用就行。
- 考虑到周期太长，采用敏捷开发的思想，先做一个个人介绍的网站以后逐步追加新的内容
- 这周发现hexo这个博客简化工具，现阶段先使用[Hexo](http://shenxf.top/categories/%E5%8D%9A%E5%AE%A2/)
- 用docker的话还能使用[jekyll](https://www.jekyll.com.cn/)
- [.art文件如何后html的变色和提示](http://shenxf.top/2019/04/22/20190422-vscode/)