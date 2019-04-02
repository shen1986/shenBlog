/*
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-02 12:56:22
 */
//   `detail` text,
//   `created_at` datetime DEFAULT NULL,
//   `updated_at` datetime DEFAULT NULL,
//   `save_name` varchar(100) DEFAULT NULL,
//   `file_name` varchar(100) DEFAULT NULL,
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    detail: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    save_name: {
        type: String,
        default: '',
        max: 100
    },
    file_name: {
        type: String,
        default: '',
        max: 100
    }
});

var Gossip = mongoose.model('Gossip', schema);

module.exports = Gossip;