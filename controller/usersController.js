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
var models = require('../models');
var UserInfo = models.UserInfo;


//================================注册开始=============
router.get('/toReg',function(req,res){
    sexInfoService.getAllSexInfo(function(err,sexInfoArr){
        res.render('loginAndReg/reg',{sexAll:sexInfoArr});
    });
});

router.post('/isUserExists',function(req,res){
    var _id = req.body._id;
    var passwd = req.body.passwd;
    var userName = req.body.userName;
    var nickName = req.body.nickName;
    var safeEmail = req.body.safeEmail;

    var query = {}
    if(_id){
        query._id = _id;
    }
    if(userName){
        query.userName = userName;
    }
    if(passwd){
        passwd = encryption.encrypt(passwd,config.encryption.secret);
        query.passwd = passwd;
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
    var isAdmin = false;
    if('admin' === userName){
        isAdmin = true;
        //因为不想写的很复杂了，毕竟只是个Demo，留个后门~ 哈哈~
        //注意：这里没有判断用户名和昵称还有邮箱是否在数据库中存在，所以如果对方不走浏览器，还是防不住的。毕竟是防君子防不了小人~
    }
    if(passwd){
        passwd = encryption.encrypt(passwd,config.encryption.secret);
    }

    if(userName && passwd && nickName && safeEmail && sex){
        userInfoService.newAndUserInfo(userName,passwd,nickName,sex,safeEmail,isAdmin,function(err,userInfo){
            if(userInfo){
                authFiter.gen_session(userInfo,res);
                //req.session.userInfo = new UserInfo(userInfo);
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

//================================注册结束=============

//================================登陆退出=============
router.get('/logOut',function(req,res){
    req.session.destroy();
    res.clearCookie(config.sessionConfig.auth_cookie_name, { path: '/' });
    res.redirect('/');
});



//================================登陆开始=============
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
    if(!objUtil.isEmptyObj(query)){
        userInfoService.getUserInfo({userName:userName,passwd:passwd},function(err,userInfo){
            if(userInfo){
                //req.session.userInfo = new UserInfo(userInfo);
                authFiter.gen_session(userInfo,res);
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
//================================登陆结束=============

//======================个人信息页面开始=======添加过滤器=========

router.get('/toEdit',authFiter.authorize, function(req, res) {
    res.render('userInfo/editUser');
});

router.post('/doEdit',authFiter.authorize,function(req,res){
    var _id = req.body._id;
    var nickName = req.body.nickName;
    var signature =  req.body.signature;
    var safeEmail = req.body.safeEmail;
    var passwd = req.body.passwd;
    var sex = req.body.sex;
    var level = req.body.level;

    userInfoService.getUserById(_id,function(err,userInfo){
        if(nickName){
            userInfo.nickName = nickName;
        }
        if(signature){
            userInfo.signature = signature;
        }
        if(safeEmail){
            userInfo.safeEmail = safeEmail;
        }
        if(passwd){
            passwd = encryption.encrypt(passwd,config.encryption.secret);
            userInfo.passwd = passwd;
        }
        if(sex){
            userInfo.sex = sex;
        }
        if(level){
            userInfo.level = level;
        }
        userInfo.save(function(err,userInfo){
            req.session.userInfo = userInfo;
            res.redirect('/users/toEdit');
        });
    });
});

//上传头像
router.post('/uploadHeadPortrait',authFiter.authorize,function(req,res){

    var _id = req.body._id;
    var  headImageFile =  req.files.headImage;
    if(!headImageFile || objUtil.isEmptyObj(headImageFile)){
        res.redirect('/users/toEdit');
        return;
    }

    var headImageFilePath = headImageFile.path;
    headImageFilePath = headImageFilePath.replace('public','').replace(/\\/g,'/');
    userInfoService.getUserById(_id,function(err,userInfo){
        userInfo.headImage = headImageFilePath;
        userInfo.save(function(err,userInfo){
            req.session.userInfo = userInfo;
            res.redirect('/users/toEdit');
        });
    });
})


//======================个人信息页面结束================









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
