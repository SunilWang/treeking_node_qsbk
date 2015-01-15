/**
 * Created by admin on 2015/1/15.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :storyInfoController-no.js
//        description：糗事稿件
//
//        created by 王澍 at  2015年1月15日16:16:56
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var express = require('express');
var router = express.Router();
var models = require('../models');
var StoryInfo = models.StoryInfo;


//=========
router.get('/toReg',function(req,res){
     res.render('storyInfo/deliver',{sexAll:sexInfoArr});
});