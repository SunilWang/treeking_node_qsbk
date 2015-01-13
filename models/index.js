/**
 * Created by admin on 2015/1/12.
 */

//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :index.js
//        description :这是模型层与数据库连接
//
//        created by 王澍 at  2015年1月12日9:36:42
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var mongoose = require('mongoose');
var dbConfig = require('../config/config').dbConfig;
var log4js = require('./../app').logger('fileAppenderError');

//创建数据库连接
mongoose.connect(dbConfig.dbUrl, function (err) {
    if (err) {
        console.error('connect to %s error: ', dbConfig.dbUrl, err.message);
        log4js.error('connect to %s error: ', dbConfig.dbUrl, err.message);;
        process.exit(1);
    }
});

// models
require('./sexInfo');
require('./userInfo');



exports.SexInfo = mongoose.model('SexInfo');
exports.UserInfo = mongoose.model('UserInfo');