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
exports.commentModel={
    _id:'',
    storyId:'',//关联的稿件ID
    content:'',//评论内容
    commentAuthId:'',//作者id
    submitTime:new Date()//创建时间
};