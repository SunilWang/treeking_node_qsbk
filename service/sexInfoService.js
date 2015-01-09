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
var mongodb = require('../util/mongoJoin').db;
function sexInfoService(sexInfo){
    this.sexInfoModel = sexInfo;
}

//获取所有性别的信息
sexInfoService.getAllSexInfo = function(callback){
    var sexInfodb = mongodb.collection('sexInfo');
    sexInfodb.find({},(function(err,data){
        if(err){
            return callback(err);
        }
        var sexInfoArr = [];
        data.each(function(err,doc){
            sexInfoArr.push(doc);
        });
        callback(null,sexInfoArr);
    }));

}

module.exports = sexInfoService;