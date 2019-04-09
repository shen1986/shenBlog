/*
 * @Description: 类别
 * @Author: shenxf
 * @Date: 2019-04-02 12:38:59
 */
//   `theme` varchar(30) DEFAULT NULL,
//   `status` tinyint(1) DEFAULT '1',
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    theme: {
        type: String,
        required: true,
        max: 30
    },
    status: {
        type: Boolean,
        default: true
    }
});

var Category = mongoose.model('Category', schema);

module.exports = Category;
