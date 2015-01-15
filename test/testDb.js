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
var RequestProcessing  = require('../util/requestProcessing');
var config = require('../config/config');
var customServerError = require('../config/config').customServerError;
var schedule = require("node-schedule");
var timer = require('../util/timer');


/* GET home page. */
router.get('/', function(req, res) {
    req.session.user={name:'wangshu',pass:'admin1234'};
    //req.flash('@@CustomServerErrorMessage','非法请求数据');
    //req.flash(customServerError.CustomServerErrorStackInfo,'您不能这样去访问啊。。。。');
    //RequestProcessing.customServerError(req,res);
    //console.log(req.body.name);

    //var news = mongodb.collection('news');

   /* timer.open(function(){
        news.findOne({},function(err,data) {
            var tt = data.publishTime;
            console.log(tt instanceof Date);
            console.log(tt.getHours());
            console.log(data);
        });
    });*/



   /* news.insert({
     "title" : "新闻标题8",
     "contert" : "这是新闻内容",
     "pulisher" : "发布者",
     "publishTime" : new Date()
     });*/
    /*news.count(function(err,count){
        console.log(count);
    });*/
    /*news.findOne({},function(err,data) {
        var tt = data.publishTime;
        console.log(tt instanceof Date);
        console.log(tt.getHours());
         console.log(data);*/

       /* data.each(function (err, doc) {
            onsole.log(doc._id);
            console.log(doc.title);

            console.log(doc);
        })
    });*/
    /*var sexInfo = mongodb.collection('sexInfo');
    sexInfo.find({},function(err,data){
        data.each(function(err,doc){
            console.log(doc._id);
            console.log(doc);
        });
    });*/
    res.render('index', { title: 'Express',userName:'haha' });
    //res.send(JSON.stringify({name:'wangshu',age:24}));
});

router.get('/add',function(req,res){
    var userName = req.session.user.name;
    timer.close();
    res.render('index',{ title: 'Express',userName:userName});
});

router.get('/rms',function(req,res){
    req.session.destroy();
    res.render('index',{ title: 'Express',userName:'aaaa'});
});

module.exports = router;