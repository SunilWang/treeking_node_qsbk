/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :userInfoService.js
//        description：用户Service
//
//        created by 王澍 at  2015年1月9日16:19:54
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var models = require('../models');
var UserInfo = models.UserInfo;
var log4js = require('./../app').logger();
var objUtil = require('../util/objUtil')


exports.getUserInfo = function (query,callback){
    UserInfo.findOne(query,callback);
}


exports.getUsersByIds = function (ids, callback) {
    UserInfo.find({'_id': {'$in': ids}}, callback);
};

exports.getUserById = function (id, callback) {
    UserInfo.findOne({_id: id}, callback);
};

exports.newAndUserInfo = function (userName,passwd,nickName,sex,safeEmail,isAdmin, callback) {
    var userInfo = new UserInfo();
    userInfo.userName = userName;
    userInfo.passwd = passwd;
    userInfo.nickName = nickName;
    userInfo.sex = sex;
    userInfo.safeEmail = safeEmail;
    userInfo.isAdmin = isAdmin;
    userInfo.save(callback);
};