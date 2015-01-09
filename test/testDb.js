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
    req.session.user={name:'wangshu',pass:'admin1234'};
    var news = mongodb.collection('news');
    /*news.insert({
     "title" : "新闻标题8",
     "contert" : "这是新闻内容",
     "pulisher" : "发布者",
     "publishTime" : new Date()
     });*/
    /*news.count(function(err,count){
        console.log(count);
    });*/
    news.find({publishTime : { "$gte": new Date('2015-01-09'),"$lt":new Date('2015-01-11')}},function(err,data){
       // console.log(data);

        data.each(function(err,doc){
            /*console.log(doc._id);
            console.log(doc.title);*/
            console.log(doc);
        });
    });

    res.render('index', { title: 'Express',userName:'haha' });
});

router.get('/add',function(req,res){
    var userName = req.session.user.name;
    res.render('index',{ title: 'Express',userName:userName});
});

router.get('/rms',function(req,res){
    req.session.destroy();
    res.render('index',{ title: 'Express',userName:'aaaa'});
});

module.exports = router;