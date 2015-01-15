/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :commentInfo.js
//        description：投稿实体类
//
//        created by 王澍 at  2015年1月8日15:09:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var StoryInfoSchema = new Schema({
    subject: { type: String,default: ''},//主题
    content: { type: String,default: ''},//稿件内容
    image: { type: String,default: ''},//稿件图片
    authId: { type: ObjectId},//作者id
    submitTime: { type: Date,default: Date.now},//创建时间
    approve: { type: Number, default: 0 },//审批结果：0未经审核，1未通过审核，2通过审核
    replyNum:{ type: Number, default: 0 },
    positiveFeedbackNum: { type: Number, default: 0 },//赞的次数
    negativeFeedbackNum: { type: Number, default: 0 },//差评的次数
    positiveId:[Schema.Types.ObjectId],
    negative:[Schema.Types.ObjectId],
    isAnonymous: { type: Boolean,default: false}//是否匿名
});

StoryInfoSchema.index({submitTime:-1});
StoryInfoSchema.index({authId:-1,submitTime:-1});

mongoose.model('StoryInfo', StoryInfoSchema);


/*
exports.storyModel={
    _id:'',
    subject:'',//主题
    content:'',//稿件内容
    image:'',//稿件图片
    authId:'',//作者id
    submitTime:new Date(),//提交时间
    approve:0,//审批结果：0未经审核，1未通过审核，2通过审核
    approveUser:'',//审批者ID
    positiveFeedbackNum:0,//赞的次数
    negativeFeedbackNum:0,//差评的次数
    isAnonymous:0//是否匿名

};*/
