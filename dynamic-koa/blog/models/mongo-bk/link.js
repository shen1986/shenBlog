/*
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-02 19:51:29
 */
// `text` varchar(50) DEFAULT NULL,
// `url` text,
// `status` tinyint(1) DEFAULT '1',

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    text: {
        type: String,
        max: 50,
        default: ''
    },
    url: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

var Link = mongoose.model('Link', schema);

module.exports = Link;