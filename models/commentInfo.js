/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :commentInfo.js
//        description：评论实体类
//
//        created by 王澍 at  2015年1月8日15:09:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentInfoSchema = new Schema({
    storyId: { type: ObjectId},//关联的稿件ID
    content: { type: String,default: ''},//评论内容
    commentAuthId: { type: ObjectId},//作者id
    submitTime: { type: Date,default: Date.now}//创建时间

});

CommentInfoSchema.index({submitTime:-1});

mongoose.model('CommentInfo', CommentInfoSchema);