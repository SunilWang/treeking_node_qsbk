/**
 * Created by admin on 2015/1/8.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :mongoJoin3.js
//        description：数据库连接对象
//
//        created by 王澍 at  2015年1月8日16:49:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var mongodb = require('mongodb');
var log4js = require('./../app').logger('fileAppenderError');
var ObjectID = mongodb.ObjectID;

var dbConfig = require('../config/config').dbConfig;

mongodb.connect('mongodb://admin:1111@127.0.0.1:27017/qsbknode',function(err,db){
    module.exports = db;
});


//导出模块
module.exports = {
    ObjectID:ObjectID,//ObjectID对象
    objectId:{//返回一个新的mongodb objectId
        newId:function(){
            return new ObjectID();
        }
    }
};