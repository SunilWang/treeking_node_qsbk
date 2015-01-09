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

};