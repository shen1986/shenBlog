/*
 * @Description: 主js
 * @Author: shenxf
 * @Company: 魔笙科技
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
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        verticalCentered: false,
        navigation: true,
        afterLoad:function (link,index) {
            /*index 序号 1开始  当前屏的序号*/
            $('.section').eq(index-1).addClass('now');
        },
        onLeave:function(index, nextIndex, direction) {
            if (index === 2 && nextIndex === 3) {
                $('.section').eq(index-1).addClass('leaved');
            } else if (index === 3 && nextIndex === 4) {
                $('.section').eq(index-1).addClass('leaved');
            }else if (index === 4 && nextIndex === 5) {
                $('.section').eq(index-1).addClass('leaved');
            }else if (index === 5 && nextIndex === 6) {
                $('.section').eq(index-1).addClass('leaved');
                $('.screen06 .box').addClass('show');
            }else if (index === 6 && nextIndex === 7) {
                $('.screen07 .stars').addClass('show');
                $('.screen07 .text').addClass('show');
                $('.screen07 .stars img').each(function(i, item){
                    $(this).css("transition-delay",i*0.5 + "s");
                });
            }
        },
        afterRender: function(){
            $('.more').on('click', function(){
                $.fn.fullpage.moveSectionDown();
            });
            $('.screen04 .cart').on('transitionend',function () {
                $('.screen04 .address').show().find('img:last').fadeIn(1000);
                $('.screen04 .text').addClass('show');
            });
            $('.screen05 .mouse img:last').on('transitionend',function () {
                $('.screen04 .sofa2').addClass('show');
            });

            $('.screen04 .sofa2').on('animationend', function() {
                $('.screen05 .sofa').addClass('show');
            });

            $('.screen06 .car .sayImg').on('transitionend', function(){
                $('.screen06 .person').addClass('show');
            });

            $('.screen07 .stars img').fadeIn(1000);

            $('.screen08').on('mousemove', function(e) {
                $(this).find('.hand').css(
                    {
                        left: e.clientX + 20,
                        top: e.clientY + 20
                    }
                )
            }).find('.again').on('click', function(){
                $('.show').removeClass('show');
                $('.now').removeClass('now');
                $('.leaved').removeClass('leaved');
                $('.content [style]').removeAttr('style');
                $.fn.fullpage.moveTo(1);
            });
        },
        /*页面切换的时间 默认是700*/
        scrollingSpeed:1000
    });
});