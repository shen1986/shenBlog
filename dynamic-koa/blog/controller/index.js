/*
 * @Description: 首页控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:15:13
 */
const dbAccess = require('./dbAccess');

// 获得首页
exports.getHome = async function (ctx, next) {

    await ctx.render("index.art", {
        ...ctx.res.$initValue,
        common: {
            banner: true
        },
        index: {
            name: "aui",
            tags: ["art", "template", "nodejs"]
        }
    });
};

//{"status":1,"portrait":{"intro":"处女座程序员，轻度选择困难症患者，Web领域的手艺人","viewCount":"66995","articleCount":110},"articles":[{"id":124,"title":"用CSS绘制0.5px的线"},{"id":123,"title":"多行文本溢出显示省略号"},{"id":122,"title":"纯CSS实现瀑布流布局"},{"id":121,"title":"使用pointer-events为网页添加水印背景"},{"id":120,"title":"纯CSS设置元素高度等于其动态宽度"},{"id":118,"title":"CSS3实现饼状图倒计时效果"},{"id":119,"title":"svg实现圆环进度条或倒计时效果"},{"id":117,"title":"为什么我要做5份webpack配置文件"},{"id":116,"title":"使用axios封装一个异步请求api"},{"id":115,"title":"如何搭建一个mock server"}],"categories":[{"id":1,"theme":"Html"},{"id":2,"theme":"CSS"},{"id":4,"theme":"JavaScript"},{"id":7,"theme":"React"},{"id":8,"theme":"数据库"},{"id":9,"theme":"web综合"},{"id":11,"theme":"web性能优化"},{"id":12,"theme":"笔试"},{"id":13,"theme":"面试"},{"id":14,"theme":"Canvas"},{"id":15,"theme":"ECMAScript"},{"id":16,"theme":"nodejs"},{"id":19,"theme":"设计模式"}],"links":[{"id":1,"text":"大肚子朱总的个人博客","url":"http://cnzhujie.cn"},{"id":2,"text":"苏州大学官网","url":"http://www.suda.edu.cn"}],"tags":["0.5px","溢出","省略号","瀑布流","pointer-events","水印","vw","vh","padding","svg","饼状图","webpack","axios","mock","for...in","for...of","forEach","面试","柯里化","Immutable","浅复制","深复制","react"]}