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


router.get('/:id', function(req, res) {
    var id = req.params.id;
    storyInfoService.getFullStoryInfo(id,function(err,storyInfo,author,commentInfos){
        storyInfo.author = author;
        storyInfo.commentInfos = commentInfos;
        res.render('storyInfo/fullStoryInfo',{pageStoryInfo:storyInfo});
    });
});

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




module.exports = router;