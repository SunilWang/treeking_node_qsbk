/**
 * Created by wangshu on 2015/1/18.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :adminController.js
//        description：管理员后台处理
//
//        created by 王澍 at 2015年1月18日16:03:05
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var express = require('express');
var router = express.Router();
var authFiter = require('../fiters/authFiter');
var config = require('../config/config');
var eventproxy = require('eventproxy');
var customServerError = config.customServerError;
var userInfoService = require('../service/userInfoService');
var storyInfoService = require('../service/storyInfoService');
var util = require('util');
var timer = require('../util/timer');
var log4js = require('./../app').logger();

//管理员用户列表
router.get('/account',authFiter.adminRequired,function(req,res){

    var nickName = req.query.nickName;
    var query={};
    query.userName = {$ne:'admin'};
    if(nickName){
        query.nickName = {$regex: nickName, $options:'g'};
    }else{
        nickName = '';
    }
    userInfoService.getUserAll(query,function(err,userInfos){
        res.render('admin/account',{pageUserInfos:userInfos,nickName:nickName});
    });
});



//操作用户，解冻 解冻
router.get('/updateDisable',authFiter.adminRequired,function(req,res){
    var disable = req.query.disable;
    var userId =  req.query.userId;
    userInfoService.getUserById(userId,function(err,userInfo){
        userInfo.isDisable = disable;
        userInfo.save(function(err,userInfo){
            res.redirect('/admin/account');
        });
    });
});

//待审核的帖子
router.get('/verify',authFiter.adminRequired,function(req,res){
    var proxy = new eventproxy();
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;

    var query = {};
    query.approve = 0;
    var limit = config.list_storyInfo_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-submitTime'};
    storyInfoService.getStoryInfoByQuery(query,options,proxy.done('storyInfos'));
    storyInfoService.getCountByQuery(query, proxy.done(function (all_storyInfos_count) {
        var pages = Math.ceil(all_storyInfos_count / limit);
        proxy.emit('pages', pages);
    }));

    proxy.all('storyInfos','pages',function (storyInfos,pages) {
        pages = pages == 0 ? 1 : pages;
        res.render('admin/verify', {
            storyInfos:storyInfos,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            base:'/admin'+req.path
        });
    });
});


//更改审核帖子
router.get('/updateVerify',authFiter.adminRequired,function(req,res){

    var storyInfoId = req.query.storyInfoId;
    var approve = req.query.approve;
    storyInfoService.getStoryInfoById(storyInfoId,function(err,storyInfo){
        storyInfo.approve = approve;
        storyInfo.save(function(err,storyInfo){
            res.redirect('/admin/verify');
        });
    });
});


//首页违规帖子审核不通过
router.get('/indexUpdateVerify',authFiter.adminRequired,function(req,res){

    var storyInfoId = req.query.storyInfoId;
    var approve = req.query.approve;
    storyInfoService.getStoryInfoById(storyInfoId,function(err,storyInfo){
        storyInfo.approve = approve;
        storyInfo.save(function(err,storyInfo){
            res.redirect('/');
        });
    });
});


router.post('/updateVerify',authFiter.adminRequired,function(req,res){

    var storyInfoIds = req.body.storyInfoId;
    var approve = req.body.approve;

    if(util.isArray(storyInfoIds)) {
        var proxy = new eventproxy();
        proxy.after('updateStoryInfo', storyInfoIds.length, function (storyInfos) {
            res.redirect('/admin/verify');
        });

        storyInfoIds.forEach(function (id, i) {
            storyInfoService.getStoryInfoById(id, function (err, storyInfo) {
                storyInfo.approve = approve;
                storyInfo.save(proxy.group('updateStoryInfo'));
            });
        });
    }else{
        storyInfoService.getStoryInfoById(storyInfoIds,function(err,storyInfo){
            storyInfo.approve = approve;
            storyInfo.save(function(err,storyInfo){
                res.redirect('/admin/verify');
            });
        });
    }
});



router.get('/kqdsq',authFiter.adminRequired,function(req,res){

    if(timer.isOpen()){
        return res.send('定时器已经开启，请不要重复开启！');
    }
    timer.open(function(){
        var proxy = new eventproxy();
        var query = {};
        query.approve = 0;

        storyInfoService.getStoryInfoByQuery(query,{},function(err,storyInfos){
            proxy.after('updateStoryInfo', storyInfos.length, function (storyInfos) {

            });

            storyInfos.forEach(function(storyInfo,index){
                storyInfo.approve = 2;
                storyInfo.save(proxy.group('updateStoryInfo'));
            });
        });
    });
    log4js.info('开启定时器！');
    res.send('成功开启定时器！');
});


router.get('/gbdsq',authFiter.adminRequired,function(req,res){

    if(timer.isClose()){
        return res.send('定时器已经关闭，请不要重复关闭！');
    }
    timer.close();
    log4js.info('关闭定时器！');
    res.send('成功关闭定时器！');
});



module.exports = router;