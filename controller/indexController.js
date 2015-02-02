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
var eventproxy = require('eventproxy');
var customServerError = config.customServerError;

//首页
router.get('/', function(req, res) {
    var proxy = new eventproxy();
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;

    var query = {};
    query.approve = 2;
    var limit = config.list_storyInfo_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-positiveFeedbackNum -submitTime'};

    storyInfoService.getStoryInfoByQuery(query,options,proxy.done('storyInfos'));
    storyInfoService.getCountByQuery(query, proxy.done(function (all_storyInfos_count) {
        var pages = Math.ceil(all_storyInfos_count / limit);
        proxy.emit('pages', pages);
    }));

    proxy.all('storyInfos','pages',function (storyInfos,pages) {
        res.render('index', {
            storyInfos:storyInfos,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            base:req.path,
            baseIndex:1
        });
    });
});


//精华：24小时内
router.get('/hot', function(req, res) {
    var proxy = new eventproxy();
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var now = new Date();
    var yesterday = new Date(new Date(new Date()-24*60*60*1000*1));
    var query = {};
    query.approve = 2;

    query.submitTime ={$gte: yesterday, $lte: now};
    var limit = config.list_storyInfo_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-positiveFeedbackNum -submitTime'};

    storyInfoService.getStoryInfoByQuery(query,options,proxy.done('storyInfos'));
    storyInfoService.getCountByQuery(query, proxy.done(function (all_storyInfos_count) {
        var pages = Math.ceil(all_storyInfos_count / limit);
        proxy.emit('pages', pages);
    }));

    proxy.all('storyInfos','pages',function (storyInfos,pages) {
        res.render('index', {
            storyInfos:storyInfos,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            base:req.path,
            baseIndex:2
        });
    });
});

//精华：7天内
router.get('/week', function(req, res) {
    var proxy = new eventproxy();
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var now = new Date();
    var week = new Date(new Date(new Date()-24*60*60*1000*7));
    var query = {};
    query.approve = 2;

    query.submitTime ={$gte: week, $lte: now};
    var limit = config.list_storyInfo_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-positiveFeedbackNum -submitTime'};

    storyInfoService.getStoryInfoByQuery(query,options,proxy.done('storyInfos'));
    storyInfoService.getCountByQuery(query, proxy.done(function (all_storyInfos_count) {
        var pages = Math.ceil(all_storyInfos_count / limit);
        proxy.emit('pages', pages);
    }));

    proxy.all('storyInfos','pages',function (storyInfos,pages) {
        res.render('index', {
            storyInfos:storyInfos,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            base:req.path,
            baseIndex:2
        });
    });
});

//精华：30天内
router.get('/month', function(req, res) {
    var proxy = new eventproxy();
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var now = new Date();
    var month = new Date(new Date(new Date()-24*60*60*1000*30));
    var query = {};
    query.approve = 2;

    query.submitTime ={$gte: month, $lte: now};
    var limit = config.list_storyInfo_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-positiveFeedbackNum -submitTime'};

    storyInfoService.getStoryInfoByQuery(query,options,proxy.done('storyInfos'));
    storyInfoService.getCountByQuery(query, proxy.done(function (all_storyInfos_count) {
        var pages = Math.ceil(all_storyInfos_count / limit);
        proxy.emit('pages', pages);
    }));

    proxy.all('storyInfos','pages',function (storyInfos,pages) {
        res.render('index', {
            storyInfos:storyInfos,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            base:req.path,
            baseIndex:2
        });
    });
});



//真相:硬菜
router.get('/imgrank', function(req, res) {
    var proxy = new eventproxy();
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var query = {};
    query.approve = 2;
    query.image ={$ne: ''};
    var limit = config.list_storyInfo_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-positiveFeedbackNum -submitTime'};

    storyInfoService.getStoryInfoByQuery(query,options,proxy.done('storyInfos'));
    storyInfoService.getCountByQuery(query, proxy.done(function (all_storyInfos_count) {
        var pages = Math.ceil(all_storyInfos_count / limit);
        proxy.emit('pages', pages);
    }));

    proxy.all('storyInfos','pages',function (storyInfos,pages) {
        res.render('index', {
            storyInfos:storyInfos,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            base:req.path,
            baseIndex:3
        });
    });
});

//真相:时令
router.get('/pic', function(req, res) {
    var proxy = new eventproxy();
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var query = {};
    query.approve = 2;
    query.image ={$ne: ''};
    var limit = config.list_storyInfo_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-submitTime'};

    storyInfoService.getStoryInfoByQuery(query,options,proxy.done('storyInfos'));
    storyInfoService.getCountByQuery(query, proxy.done(function (all_storyInfos_count) {
        var pages = Math.ceil(all_storyInfos_count / limit);
        proxy.emit('pages', pages);
    }));

    proxy.all('storyInfos','pages',function (storyInfos,pages) {
        res.render('index', {
            storyInfos:storyInfos,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            base:req.path,
            baseIndex:3
        });
    });
});

//最新
router.get('/late', function(req, res) {
    var proxy = new eventproxy();
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var now = new Date();
    var month = new Date(new Date(new Date()-24*60*60*1000*30));
    var query = {};
    query.approve = 2;
    query.submitTime ={$gte: month, $lte: now};
    var limit = config.list_storyInfo_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-submitTime'};

    storyInfoService.getStoryInfoByQuery(query,options,proxy.done('storyInfos'));
    storyInfoService.getCountByQuery(query, proxy.done(function (all_storyInfos_count) {
        var pages = Math.ceil(all_storyInfos_count / limit);
        proxy.emit('pages', pages);
    }));

    proxy.all('storyInfos','pages',function (storyInfos,pages) {
        res.render('index', {
            storyInfos:storyInfos,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            base:req.path,
            baseIndex:4
        });
    });
});

router.get('/add',authFiter.authorize,function(req,res){
    res.render('storyInfo/deliver',{baseIndex:5});
});


router.post('/add',authFiter.authorize,function(req,res){

    var content = req.body.content;
    var imageFile =  req.files.imgFile;
    var userInof = req.session.userInfo;
    var imageFilePath = '';
    if(imageFile && !objUtil.isEmptyObj(imageFile)){
        imageFilePath = imageFile.path;
        var imageFilePath =  imageFilePath.substring(imageFilePath.lastIndexOf('public')+6);
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
