/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :userInfo.js
//        description：用户实体类
//
//        created by 王澍 at  2015年1月8日15:09:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var UserInfoSchema = new Schema({
    userName: { type: String,default: ''},//用户名
    passwd: { type: String,default: ''},//密码
    nickName: { type: String,default: ''},//昵称
    sex: { type: String,default: ''},//性别
    level: { type: String,default: ''},//等级
    signature: { type: String,default: ''},//签名档
    safeEmail: { type: String,default: ''},//安全邮箱
    headImage: { type: String,default: ''},//头像
    isDisable: { type: Boolean,default: false},//是否禁用
    createTime: { type: Date,default: Date.now},//创建时间
    isAdmin:{type: Boolean,default: false}

});
UserInfoSchema.index({userName:1});
UserInfoSchema.index({userName:1,passwd:-1});
UserInfoSchema.index({email:1});


mongoose.model('UserInfo', UserInfoSchema);
