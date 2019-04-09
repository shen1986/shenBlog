/*
 * @Description: 用户表
 * @Author: shenxf
 * @Date: 2019-04-02 11:24:01
 */
var mongoose = require('mongoose');

//   `userid`
//   varchar(30) NOT NULL,
//       `username`
//   varchar(30) DEFAULT NULL,
//       `password`
//   varchar(64) DEFAULT NULL,
//       `status`
//   tinyint(1) DEFAULT '1',
var schema = mongoose.Schema({
    userid: {
        type: String,
        required: true,
        max: 30
    },
    username: {
        type: String,
        required: true,
        max: 30
    },
    password: {
        type: String,
        required: true,
        max: 64
    },
    status: {
        type: Boolean,
        default: true
    }
});

var User = mongoose.model('User', schema);

module.exports = User;