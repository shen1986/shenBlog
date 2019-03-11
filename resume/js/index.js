/*
 * @Description: 主js
 * @Author: shenxf
 * @Date: 2019-02-28 20:33:47
 */
$(function () {
    // 自我介绍数据
    var resumeDate = {
        // 首页
        home: {
            photo: '/resume/images/header.jpeg',
            quote: '生活是一种绵延不绝的渴望，渴望不断上升，变得更伟大而高贵。',
            desList: [
                '我叫小沈',
                '一名前端研发工程师',
                'shenxf1986@qq.com'
            ]
        },
        // 关于我
        info: {
            infoList: [
                {key: '年龄', value: '32岁'},
                {key: '学历', value: '本科'},
                {key: '坐标', value: '上海'},
                {key: '状态', value: '在职'}
            ],
            infoDes: [
                '三年互联网经验,两年半全职前端开发经验',
                '熟悉MV*开发,深谙自动化,模块化开发之道',
                '高效的自学能力,具备独立分析解决问题能力',
                '强烈的自我驱动力,代码强迫症患者'
            ]
        },
        // 技能栈
        skill: {
            outCircle: ['gulp','angular','webpack','less','git','nodejs','cordova','react'],
            innerCircle: ['es6','vue','ng2','fp'],
            des: [
                '熟练使用angular,vue,react及各种类库的指令封装',
                '常驻PC/APP/微信三平台前端研发',
                '擅长组件/插件开发，能脱离库书写JS代码',
                '编码常思其健壮性，扩展性，维护性'
            ]
        },
        // 经历
        experience: [
            {
                contentLeft: 'img/e_seo.svg',
                contentRight: {
                    title: '壹零陆文化传播有限责任公司',
                    time: '2014年3月~2014年8月',
                    post: 'SEO',
                    tech: 'SEO,SEM,百度（360，搜狗）竞价、推广等',
                    list: [
                        '负责网站后台维护，微博、微信等新媒体营销和推广',
                        '负责百度PPC后台调整',
                        '获得最佳新人奖',
                        '同期工作之余开始系统性的自学web前端各项技术'
                    ]
                }
            },
            {
                contentLeft: 'img/e_seo.svg',
                contentRight: {
                    title: '壹零陆文化传播有限责任公司',
                    time: '2014年3月~2014年8月',
                    post: 'SEO',
                    tech: 'SEO,SEM,百度（360，搜狗）竞价、推广等',
                    list: [
                        '负责网站后台维护，微博、微信等新媒体营销和推广',
                        '负责百度PPC后台调整',
                        '获得最佳新人奖',
                        '同期工作之余开始系统性的自学web前端各项技术'
                    ]
                }
            },
            {
                contentLeft: 'img/e_seo.svg',
                contentRight: {
                    title: '壹零陆文化传播有限责任公司',
                    time: '2014年3月~2014年8月',
                    post: 'SEO',
                    tech: 'SEO,SEM,百度（360，搜狗）竞价、推广等',
                    list: [
                        '负责网站后台维护，微博、微信等新媒体营销和推广',
                        '负责百度PPC后台调整',
                        '获得最佳新人奖',
                        '同期工作之余开始系统性的自学web前端各项技术'
                    ]
                }
            }
        ],
        // 作品集
        work: {
            workList: [
                {
                    workTitle: 'web前端工程师简历（2015年版）',
                    workDes:'本简历初版，上线一个月后，百度关键词“web前端工程师简历”排名前三，点击量数百万，深受广大前端初学者的好评及模仿，至今搜该关键词百度前10页都处处能见该简历的仿版。',
                    workLink: 'http://www.baidu.com'
                },
                {
                    workTitle: 'web前端工程师简历（2015年版）',
                    workDes:'本简历初版，上线一个月后，百度关键词“web前端工程师简历”排名前三，点击量数百万，深受广大前端初学者的好评及模仿，至今搜该关键词百度前10页都处处能见该简历的仿版。',
                    workLink: 'http://www.baidu.com'
                },
                {
                    workTitle: 'web前端工程师简历（2015年版）',
                    workDes:'本简历初版，上线一个月后，百度关键词“web前端工程师简历”排名前三，点击量数百万，深受广大前端初学者的好评及模仿，至今搜该关键词百度前10页都处处能见该简历的仿版。',
                    workLink: 'http://www.baidu.com'
                },
                {
                    workTitle: 'web前端工程师简历（2015年版）',
                    workDes:'本简历初版，上线一个月后，百度关键词“web前端工程师简历”排名前三，点击量数百万，深受广大前端初学者的好评及模仿，至今搜该关键词百度前10页都处处能见该简历的仿版。',
                    workLink: 'http://www.baidu.com'
                },
            ],
            workMoreGit: 'https://github.com/shen1986' 
        },
        // 联系我
        contact: {
            contactDes1: ['灵感','代码','梦想','未来'],
            contactDes2: [
                '注重效率，偏爱敏捷开发',
                '喜欢尝试，期待新鲜事物',
                '前端即兴趣，兴趣即未来',
                '行路有良友，便是捷径',
                '带上我吧，一起看到更大的世界'
            ],
            contactType: [
                { img: 'img/s_github.svg', link: 'https://github.com/shen1986'},
                { img: 'img/s_sf.svg', link: ''},
                { img: 'img/s_blog.svg', link: ''},
                { img: 'img/s_zh.svg', link: ''},
                { img: 'img/s_wb.svg', link: ''}
            ]
        },
        // 页尾
        footer: [
            'All Rights Reserved',
            '蜀ICP备xxxxxx号 Copyright © 2019'
        ]
    }

    /*初始化fullpage组件*/
    /*1.设置每一个屏幕的背景颜色*/
    /*2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐*/
    /*3.设置导航 设置指示器 点容器*/
    /*4.监听进入某一屏的时候 回调*/
    $('.container').fullpage({
        /*配置参数*/
        sectionsColor: ["#86afa4", "#109085", "#4d5e8f", "#945c4c", "#4b85a0", "#a29971"],
        verticalCentered: false,
        navigation: true,
        afterLoad:function (link,index) {
            /*index 序号 1开始  当前屏的序号*/
            $('.section').eq(index-1).addClass('now');

            if (index == 6) {
                $('.arrow').hide();
                $('.footer').show();
            } else {
                $('.arrow').show();
                $('.footer').hide();
            }
        },
        onLeave:function(index, nextIndex, direction) {
            $('.header .list .item').removeClass('cur-index');
            $('.header .list .item').eq(nextIndex - 1).addClass('cur-index');
            if(nextIndex == 1) {
                $('.header-title').html("首页");
            } else if (nextIndex == 2) {
                $('.header-title').html("关于我");
            } else if (nextIndex == 3) {
                $('.header-title').html("技能栈");
            } else if (nextIndex == 4) {
                $('.header-title').html("经历");
            } else if (nextIndex == 5) {
                $('.header-title').html("作品集");
            } else if (nextIndex == 6) {
                $('.header-title').html("联系我");
            }
            if (index == 6) {
                $('.footer').hide();
            }
        },
        afterRender: function(){
           
        },
        /*页面切换的时间 默认是700*/
        scrollingSpeed:1000
    });

    // 经历选择
    $('.cut-list .item').on('click',function(){
        // 导航按钮变色
        console.log($(this).index());
        $('.experience .experience-content').fadeOut(200).fadeIn(200);
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    // 经历版 立体效果
    $('.experience .banner').on('mousemove', function(e){
        var xd = (e.clientX - (document.body.clientWidth/2))/40;
        var yd = (e.clientY - (document.body.clientHeight/2))/40;
        $(".experience .banner").css("transform", 'rotateY('+xd+'deg) rotateX('+yd+'deg)');
    });

    $('.experience .banner').on('mouseleave', function(e){
        $(".experience .banner").css("transform", "rotateY(0deg) rotateX(0deg)");
    });

    // 头部点击事件
    $('.header-title').on('click', function(){
        toggleTitle(this);
    });

    $('.header .list .item').on('click',function(){
        $.fn.fullpage.moveTo( $(this).index() + 1 );
        toggleTitle($('.header-title'));
    });

    var toggleTitle = function(that) {
        $(that).toggleClass('rotate');
        $('.header-nav').toggleClass('show-nav');
    };

    // 作品集
    var switchIndex = 0;
    $('.work-switch .right').on('click',function() {
        switchIndex++;
        $('.work-list').css('transform',' rotateY('+switchIndex * 90+'deg)');
    });
    $('.work-switch .left').on('click',function() {
        switchIndex--;
        $('.work-list').css('transform',' rotateY('+switchIndex * 90+'deg)');
    });

    // 中英文
    $('.language-c span').on('click',function(){
        $span = $(this);
        $languageC = $('.language-c');
        $span.siblings().removeClass('selected').end().addClass('selected');
        if ($span.index() == 1) {
            $languageC.addClass('selectEn');
        } else {
            $languageC.removeClass('selectEn');
        }
    });

    // 初始化
    var init = function() {

    };

    init();
});