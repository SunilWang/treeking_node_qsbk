//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :usersController.js
//        description：
//
//        created by 王澍 at  2015年1月8日15:09:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var express = require('express');
var router = express.Router();
var authFiter = require('../fiters/authFiter');
var sexInfoService = require('../service/sexInfoService');
var userInfoService = require('../service/userInfoService');
var encryption = require('../util/encryption');
var config = require('../config/config');
var customServerError = config.customServerError;
var RequestProcessing  = require('../util/requestProcessing');
var objUtil = require('../util/objUtil');


router.get('/toReg',function(req,res){
    sexInfoService.getAllSexInfo(function(err,sexInfoArr){
        res.render('loginAndReg/reg',{sexAll:sexInfoArr});
    });
});

router.post('/isUserExists',function(req,res){
    var userName = req.body.userName;
    var nickName = req.body.nickName;
    var safeEmail = req.body.safeEmail;

    var query = {}
    if(userName){
        query.userName = userName;
    }
    if(nickName){
        query.nickName = nickName;
    }
    if(safeEmail){
        query.safeEmail = safeEmail;
    }
    if(!objUtil.isEmptyObj(query)){
        userInfoService.getUserInfo(query,function(err,userInfo){
            var isExists = false;
            isExists = userInfo ? true : false;
            res.send(isExists);
        });
    }else{
        req.flash(customServerError.CustomServerErrorStackInfo,'非法请求用户信息!');
        RequestProcessing.customServerError(req,res);
    }
});

router.post('/registeredUsers',function(req,res){

    var userName = req.body.userName;
    var nickName = req.body.nickName;
    var passwd = req.body.passwd;
    var safeEmail = req.body.safeEmail;
    var sex = req.body.sex;

    if(passwd){
        passwd = encryption.encrypt(passwd,config.encryption.secret);
    }

    if(userName && passwd && nickName && safeEmail && sex){
        userInfoService.newAndUserInfo(userName,passwd,nickName,sex,safeEmail,function(err,userInfo){
            if(userInfo){
                res.redirect('/');
            }else{
                res.send('出错啦~');
            }
        });
    }else{
        req.flash(customServerError.CustomServerErrorStackInfo,'非法注册用户信息!');
        RequestProcessing.customServerError(req,res);
    }
});


/* GET users listing. */
router.get('/toLogin', function(req, res) {
    res.render('loginAndReg/login',{erroMsg:'',userName:''});
});



/* GET users listing. */
router.post('/doLogin', function(req, res) {
    var userName = req.body.userName;
    var passwd = req.body.passwd;

    var query = {}
    if(passwd){
        passwd = encryption.encrypt(passwd,config.encryption.secret);
        query.passwd = passwd;
    }
    if(userName){
        query.userName = userName;
    }
    console.log(query);
    if(!objUtil.isEmptyObj(query)){
        userInfoService.getUserInfo({userName:userName,passwd:passwd},function(err,userInfo){
            console.log(userInfo);
            if(userInfo){
                req.session.userInfo = userInfo;
                res.redirect('/');
            }else{
                res.render('loginAndReg/login',{erroMsg:'用户名密码错误！',userName:userName});
            }

        });
    }else{
        req.flash(customServerError.CustomServerErrorStackInfo,'非法请求用户信息!');
        RequestProcessing.customServerError(req,res);
    }
});

module.exports = router;





/*

 console.log(req.files);
 var  file =  req.files.testfile;
 var tempPath = file.path;
 var targetPath = '/uploads/' + file.name;
 console.log(tempPath);
 console.log(targetPath);
 res.redirect('/users/toReg');
 */
