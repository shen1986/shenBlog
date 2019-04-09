/*
 * @Description: 点滴
 * @Author: shenxf
 * @Date: 2019-04-02 12:42:38
 */
//   `title` varchar(100) DEFAULT NULL,
//   `detail` text,
//   `tag` varchar(30) DEFAULT NULL,
//   `created_at` date DEFAULT NULL,
//   `updated_at` date DEFAULT NULL,
//   `status` tinyint(2) DEFAULT '1',
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    detail: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        max: 30
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
});

var Gather = mongoose.model('Gather', schema);

module.exports = Gather;