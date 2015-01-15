/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :user.js
//        description：用户实体类
//
//        created by 王澍 at  2015年1月8日15:09:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//         该模型已经作废，只留作纪念。。。。
//======================================================================
exports.userModel={
    _id:'',
    userName:'',//用户名
    passwd:'',//密码
    nickName:'',//昵称
    sex:1,//性别
    level:'',//等级
    signature:'',//签名档
    email:'',//邮箱
    headImage:'',//头像
    isDisable:0,//是否禁用
    createTime:new Date()
};