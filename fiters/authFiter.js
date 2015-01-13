/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :authFiter.js
//        description：网站的过滤器
//
//        created by 王澍 at  2015年1月9日14:51:38
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var logger = require('../app').logger();
exports.authorize=function(req,res,next){
    if(!req.session.userInfo){
        logger.warn('IP：'+req.ip+',非法请求后台！');
        res.redirect('/');
    }else{
        next();
    }
};