/**
 * Created by wangshu on 2015/1/18.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :commentInfoService.js
//        description：糗事评论
//
//        created by 王澍 at  2015年1月9日16:20:04
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var EventProxy = require('eventproxy');
var models = require('../models');
var CommentInfo = models.CommentInfo;
var userInfoService = require('../service/userInfoService');
var _ = require('lodash');



exports.getCommentInfoBystoryInfoId = function(id,callback){

    CommentInfo.find({storyId:id},'',{sort: '-submitTime'},function(err,commentInfos){
        if (err) {
            return callback(err);
        }
        if (commentInfos.length === 0) {
            return callback(null, []);
        }

        var proxy = new EventProxy();
        proxy.after('commentInfo_find', commentInfos.length, function () {

            callback(null, commentInfos);
        });
        for(var i = 0;i < commentInfos.length ; i++){
            (function(j){
                var commentAuthId = commentInfos[j].commentAuthId;
                userInfoService.getUserById(commentAuthId,function(err,userInfo){
                    if (err) {
                        return callback(err);
                    }
                    commentInfos[j].author = userInfo || { _id: '' };
                    proxy.emit('commentInfo_find');
                });
            })(i);
        }
    });
}

exports.newCommentInfo = function (storyId,content,commentAuthId, callback) {
    var commentInfo = new CommentInfo();
    commentInfo.storyId = storyId;
    commentInfo.content = content;
    commentInfo.commentAuthId = commentAuthId;
    commentInfo.save(callback);
};