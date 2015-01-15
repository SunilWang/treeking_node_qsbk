//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :indexController.js
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
var authFiter = require('../fiters/authFiter');
var objUtil = require('../util/objUtil');
var storyInfoService = require('../service/storyInfoService');
var RequestProcessing  = require('../util/requestProcessing');
var config = require('../config/config');
var customServerError = config.customServerError;

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/add',authFiter.authorize,function(req,res){
    res.render('storyInfo/deliver');
});


router.post('/add',authFiter.authorize,function(req,res){

    var content = req.body.content;
    var imageFile =  req.files.imgFile;
    var userInof = req.session.userInfo;
    var imageFilePath = '';
    if(imageFile && !objUtil.isEmptyObj(imageFile)){
        imageFilePath = imageFile.path;
        imageFilePath = imageFilePath.replace('public','').replace(/\\/g,'/');
    }

    if(content){
        storyInfoService.newStoryInfo(content,imageFilePath,userInof._id,function(err,storyInfo){
            res.redirect('/');
        });
    }else{
            req.flash(customServerError.CustomServerErrorStackInfo,'非法添加稿件信息!');
            RequestProcessing.customServerError(req,res);
    }

});



module.exports = router;
