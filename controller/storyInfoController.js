/**
 * Created by wangshu on 2015/1/18.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :storyInfoController.js
//        description：糗事稿件
//
//        created by 王澍 at  2015年1月18日10:08:51
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var express = require('express');
var router = express.Router();
var storyInfoService = require('../service/storyInfoService');
var commentInfoService = require('../service/commentInfoService');

var log4js = require('./../app').logger();
var authFiter = require('../fiters/authFiter');

//查看用户糗事页面
router.get('/remove/:userid/:id',authFiter.authorize, function(req, res) {
    var userid = req.params.userid;
    var id = req.params.id;
    storyInfoService.removeStoryInfoById(id,function(err,doc){
        res.redirect('/users/all/'+userid);
    });
});

//查询一条糗事，并且包含所有评论
router.get('/:id', function(req, res) {
    var id = req.params.id;
    storyInfoService.getFullStoryInfo(id,function(err,storyInfo,author,commentInfos){
        storyInfo.author = author;
        storyInfo.commentInfos = commentInfos;
        res.render('storyInfo/fullStoryInfo',{pageStoryInfo:storyInfo});
    });
});


//添加评论
router.post('/addCommentInfo',authFiter.authorize,function(req,res){
    var storyId = req.body.storyId;
    var content = req.body.content;
    var userInfo = req.session.userInfo;

    storyInfoService.getStoryInfoById(storyId,function(err,storyInfo,author){
        storyInfo.replyNum= storyInfo.replyNum +1;
        storyInfo.save(function(err,storyInfo){
            commentInfoService.newCommentInfo(storyId,content,userInfo._id,function(err,commentInfo){
                res.redirect('/storyInfo/'+storyId);
            });
        });
    });
});

//点击糗事赞
router.post('/getStoryInfoAddPositiveFeedbackCount',authFiter.authorize,function(req,res){
    var storyId = req.body.storyId;
    var userId = req.session.userInfo._id;
    storyInfoService.getStoryInfoById(storyId,function(err,storyInfo,author){
        storyInfo.positiveId = storyInfo.positiveId || [];
        var upIndex = storyInfo.positiveId.indexOf(userId);
        if (storyInfo.authId.equals(userId)) {
            // 不能帮自己点赞
            res.send({
                success: false,
                message: '呵呵，不能帮自己点赞。'
            });
            return;
        }else if(upIndex === -1) {
            storyInfo.positiveId.push(userId);
        }else if(upIndex >= 0){
            res.send({
                success: false,
                message: '呵呵，您已经赞过啦。'
            });
            return ;
        }
        storyInfo.positiveFeedbackNum = storyInfo.positiveFeedbackNum + 1;
        storyInfo.save(function(err,storyInfo){
            res.send({
                success: true,
                message: '',
                positiveFeedbackNum : storyInfo.positiveFeedbackNum
            });
        });
    });
});


//点击糗事踩
router.post('/getStoryInfoAddNegativeFeedbackCount',authFiter.authorize,function(req,res){
    var storyId = req.body.storyId;
    var userId = req.session.userInfo._id;
    storyInfoService.getStoryInfoById(storyId,function(err,storyInfo,author){
        storyInfo.negative = storyInfo.negative || [];
        var upIndex = storyInfo.negative.indexOf(userId);
        if (storyInfo.authId.equals(userId)) {
            // 不能帮自己点踩
            res.send({
                success: false,
                message: '呵呵，不能帮自己点踩。'
            });
            return ;
        }else if(upIndex === -1) {
            storyInfo.negative.push(userId);
        }else if(upIndex >= 0){
            res.send({
                success: false,
                message: '呵呵，您已经踩过啦。'
            });
            return ;
        }
        storyInfo.negativeFeedbackNum = storyInfo.negativeFeedbackNum + 1;
        storyInfo.save(function(err,storyInfo){
            res.send({
                success: true,
                message: '',
                negativeFeedbackNum :storyInfo.negativeFeedbackNum
            });
        });
    });
});


module.exports = router;