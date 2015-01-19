/**
 * Created by admin on 2015/1/15.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :sexInfoService.js
//        description：稿件Service
//
//        created by 王澍 at  2015年1月15日17:49:31
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var EventProxy = require('eventproxy');
var models = require('../models');
var StoryInfo = models.StoryInfo;
var userInfoService = require('../service/userInfoService');
var commentInfoService = require('../service/commentInfoService');
var _ = require('lodash');

exports.getStoryInfoByQuery = function(query, opt, callback){
    StoryInfo.find(query,'_id',opt,function(err,docs){
        if(err){
            return callback(err,null);
        }
        var storyInfo_id = _.pluck(docs, 'id');
        var proxy = new EventProxy();
        proxy.after('storyInfo_ready',storyInfo_id.length,function(storyInfos){
            //过滤掉空置
            var filtered = storyInfos.filter(function (item) {
                return !!item;
            });
            return callback(null, filtered);
        });

        storyInfo_id.forEach(function(id,i){
            exports.getStoryInfoById(id,proxy.group('storyInfo_ready',function(storyInfo,author){
                // 当id查询出来之后，进一步查询列表时，文章可能已经被删除了
                // 所以这里有可能是null
                if(storyInfo){
                    storyInfo.author = author;
                }
                return storyInfo;
            }));
        });
    });
}

exports.getCountByQuery = function (query, callback) {
    StoryInfo.count(query, callback);
};

exports.getStoryInfoById = function(id, callback){
    var proxy = new EventProxy();
    var events = ['storyInfo', 'author'];
    proxy.assign(events,function(storyInfo,author){
        if(!storyInfo){
            return callback(null,null,null);
        }
        return callback(null,storyInfo,author);
    }).fail(callback);

    StoryInfo.findOne({_id:id},proxy.done(function(storyInfo){
        if(!storyInfo){
            proxy.emit('storyInfo', null);
            proxy.emit('author', null);
            return;
        }
        proxy.emit('storyInfo',storyInfo);
        userInfoService.getUserById(storyInfo.authId,proxy.done('author'));
    }));
}


exports.getFullStoryInfo = function(id,callback){
    var proxy = new EventProxy();
    var events = ['storyInfo', 'author', 'commentInfos'];

    proxy.assign(events, function (storyInfo, author, commentInfos) {
       callback(null, storyInfo, author, commentInfos);
    }).fail(callback);


    StoryInfo.findOne({_id:id},proxy.done('storyInfo',function(storyInfo){
        if (!storyInfo) {
            proxy.unbind();
            return callback(null, '此糗事不存在或已被删除。');
        }
        userInfoService.getUserById(storyInfo.authId,proxy.done(function(author){
            if (!author) {
                proxy.unbind();
                return callback(null, '话题的作者丢了。');
            }
            proxy.emit('author', author);
        }));

        commentInfoService.getCommentInfoBystoryInfoId(id,proxy.done('commentInfos'));

        return storyInfo;
    }));
}

exports.removeStoryInfoById = function (id, callback) {
    StoryInfo.remove({_id: id},callback);
};

exports.newStoryInfo = function (content,image,authId,callback) {
    var storyInfo = new StoryInfo();
    storyInfo.content = content;
    storyInfo.image = image;
    storyInfo.authId = authId;
    storyInfo.save(callback);
};