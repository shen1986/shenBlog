/*
 * @Description: 路由模块
 * @Author: shenxf
 * @Date: 2019-03-26 16:42:37
 */
var express = require('express');
var index = require('../controller/index');
var article = require('../controller/article');
var timeline = require('../controller/timeline');
var gather = require('../controller/gather');
var gossip = require('../controller/gossip');

var router = express.Router();

// 首页
router.get('/', index.getHome);
router.get('/home', index.getHome);

// 文章页
router.get('/article', article.getArticle);

// 归档
router.get('/timeline', timeline.getTimeline);

// 点滴
router.get('/gather', gather.getGather);

// 慢生活
router.get('/gossip', gossip.getGossip);

// 404 页面
router.use(function(req, res) {
    res.render('404.art');
});

module.exports = router;