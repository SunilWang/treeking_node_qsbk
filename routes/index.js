//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :index.js
//        description：
//
//        created by 王澍 at  2015年1月8日15:09:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================

var express = require('express');
var router = express.Router();
var log4js = require('./../app').logger();
var mongodb = require('../util/mongoJoin3').db;
/* GET home page. */
router.get('/', function(req, res) {

      /*var news = mongodb.collection('news');
     *//* news.insert({
              "title" : "新闻标题7",
              "contert" : "这是新闻内容",
              "pulisher" : "发布者",
              "publishTime" : new Date().toLocaleString()
      });*//*
      news.count(function(err,count){
          console.log(count);
      });*/

    res.render('index', { title: 'Express' });
});

module.exports = router;
