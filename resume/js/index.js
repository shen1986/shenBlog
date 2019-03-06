/*
 * @Description: 主js
 * @Author: shenxf
 * @Date: 2019-02-28 20:33:47
 */
$(function () {
    /*初始化fullpage组件*/
    /*1.设置每一个屏幕的背景颜色*/
    /*2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐*/
    /*3.设置导航 设置指示器 点容器*/
    /*4.监听进入某一屏的时候 回调*/
    $('.container').fullpage({
        /*配置参数*/
        sectionsColor: ["#86afa4", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed"],
        verticalCentered: false,
        navigation: true,
        afterLoad:function (link,index) {
            /*index 序号 1开始  当前屏的序号*/
            $('.section').eq(index-1).addClass('now');
        },
        onLeave:function(index, nextIndex, direction) {

        },
        afterRender: function(){
           
        },
        /*页面切换的时间 默认是700*/
        scrollingSpeed:1000
    });
});