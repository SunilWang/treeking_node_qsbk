/**
 * Created by admin on 2015/1/8.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :testDb
//        description：测试数据库增删改查
//
//        created by 王澍 at  2015年1月8日17:26:00
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var express = require('express');
var router = express.Router();
var log4js = require('./../app').logger();
var mongodb = require('../util/mongoJoin').db;
/* GET home page. */
router.get('/', function(req, res) {

    var news = mongodb.collection('news');
    /* news.insert({
     "title" : "新闻标题7",
     "contert" : "这是新闻内容",
     "pulisher" : "发布者",
     "publishTime" : new Date().toLocaleString()
     });*/
    /*news.count(function(err,count){
        console.log(count);
    });*/

    news.find({},function(err,data){
        data.each(function(err,doc){
            console.log(doc._id);
            console.log(doc.title);
        });

    });

    res.render('index', { title: 'Express' });
});

module.exports = router;