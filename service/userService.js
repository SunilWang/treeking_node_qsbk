/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :userService.js
//        description：用户Service
//
//        created by 王澍 at  2015年1月9日16:19:54
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var userModel = require('../models/user').userModel;
var log4js = require('./../app').logger();
var mongodb = require('../util/mongoJoin').db;

function userService(user){
    this.userModel = user;
}
