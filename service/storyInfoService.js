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
var models = require('../models');
var StoryInfo = models.StoryInfo;


exports.newStoryInfo = function (content,image,authId,callback) {
    var storyInfo = new StoryInfo();
    storyInfo.content = content;
    storyInfo.image = image;
    storyInfo.authId = authId;
    storyInfo.save(callback);
};