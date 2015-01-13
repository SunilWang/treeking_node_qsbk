/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :sexInfoService.js
//        description：用户Service
//
//        created by 王澍 at  2015年1月9日16:20:04
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
/*
var mongodb = require('../util/mongoJoin').db;
var SexInfo = require('../models/sexInfo');
function sexInfoService(sexInfo){
    this.sexInfo = sexInfo;
}
var sexInfodb = mongodb.collection('sexInfo');

//获取所有性别的信息
sexInfoService.getAllSexInfo = function(callback){
    sexInfodb.find({}).toArray(function(err,data){
        if(err){
            return callback(err);
        }
        var sexInfoArr = [];
        data.forEach(function(doc,index){
            var sexInfo = new SexInfo(doc._id,doc.sexName);
            sexInfoArr.push(sexInfo);
        })
        return callback(err,sexInfoArr);
    });
}

module.exports = sexInfoService;*/
var models = require('../models');
var SexInfo = models.SexInfo;



exports.getAllSexInfo = function(callback){
    SexInfo.find({}, callback);
}

exports.newAndSexInfo = function (sexName, callback) {
    var sexInfo = new SexInfo();
    sexInfo.sexName = sexName;
    sexInfo.save(callback);
};