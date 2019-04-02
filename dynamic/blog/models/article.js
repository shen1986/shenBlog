/*
 * @Description: 文章表
 * @Author: shenxf
 * @Date: 2019-04-02 12:28:28
 */
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `title` varchar(100) DEFAULT NULL,
//   `body` longtext,
//   `tag` varchar(50) DEFAULT NULL COMMENT '每条记录的标签',
//   `category` varchar(40) DEFAULT NULL,
//   `created_at` date DEFAULT NULL,
//   `updated_at` date DEFAULT NULL,
//   `status` tinyint(1) DEFAULT '1' COMMENT '1表示正常  0表示删除 ',
//   `type` tinyint(3) DEFAULT '1' COMMENT '1：原创； 0：转载',
//   `views` int(11) DEFAULT '0',
//   `markdown` tinyint(1) DEFAULT NULL,
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    title: {
        type: String,
        default: '',
        max: 100
    },
    body: {
        type: String,
        default: ''
    },
    // 每条记录的标签
    tag: {
        type: String,
        default: '',
        max: 50
    },
    category: {
        type: String,
        default: '',
        max: 40
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    // TRUE表示正常  FALSE表示删除
    status: {
        type: Boolean,
        default: true
    },
    // TRUE：原创； FALSE：转载
    type: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    markdown: {
        type: Number
    }
});

var Aritcle = mongoose.model('Aritcle', schema);

module.exports = Aritcle;
