/*
 * @Description: 系统配置
 * @Author: shenxf
 * @Date: 2019-04-02 12:41:11
 */
//   `name` varchar(30) DEFAULT NULL,
//   `value` text,
//   `status` tinyint(1) DEFAULT '1',
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 30
    },
    value: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

var Config = mongoose.model('Config', schema);

module.exports = Config;
