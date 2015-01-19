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
var config = require('../config/config');
var eventproxy = require('eventproxy');
var userInfoService = require('../service/userInfoService');
var models = require('../models');
var UserInfo = models.UserInfo;

exports.authorize=function(req,res,next){
    if(!req.session.userInfo){
        logger.warn('IP：'+req.ip+',非法请求后台！');
        res.redirect('/users/toLogin');
    }else{
        next();
    }
};

/**
 * 需要管理员权限
 */
exports.adminRequired = function (req, res, next) {
    if (!req.session.userInfo) {
        logger.warn('IP：'+req.ip+',非法登陆管理员后台！');
        return res.send('你还没有登录。');
    }
    if (!req.session.userInfo.isAdmin) {
        logger.warn('IP：'+req.ip+',非法登陆管理员后台！');
        return res.send('需要管理员权限。');
    }
    next();
};

/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
    if (!req.session || !req.session.userInfo) {
        return res.status(403).send('forbidden!');
    }
    next();
};

exports.blockUser = function (req, res, next) {
    if (req.path === '/users/logOut') {
        return next();
    }

    if (req.session.userInfo && req.session.userInfo.isDisable && req.method !== 'GET') {
        return res.status(403).send('您已被管理员屏蔽了。有疑问请联系 ahwangshu@qq.com。');
    }
    next();
};

function gen_session(user, res) {
    var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    res.cookie(config.sessionConfig.auth_cookie_name, auth_token,
        {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true}); //cookie 有效期30天
}

exports.gen_session = gen_session;

// 验证用户是否登录
exports.authUser = function (req, res, next) {
    var ep = new eventproxy();
    ep.fail(next);

/*    if (config.debug && req.cookies['mock_user']) {
        var mockUser = JSON.parse(req.cookies['mock_user']);
        req.session.user = new UserModel(mockUser);
        if (mockUser.is_admin) {
            req.session.user.is_admin = true;
        }
        return next();
    }*/

    ep.all('get_user', function (user) {
        if (!user) {
            return next();
        }
        res.locals.userInfo = req.session.userInfo = new UserInfo(user);

/*        if (config.admins.hasOwnProperty(user.loginname)) {
            user.is_admin = true;
        }*/
        next();

    });
    if (req.session.userInfo) {
        ep.emit('get_user', req.session.userInfo);
    } else {
        var auth_token = req.signedCookies[config.sessionConfig.auth_cookie_name];
        if (!auth_token) {
            return next();
        }

        var auth = auth_token.split('$$$$');
        var user_id = auth[0];
        userInfoService.getUserById(user_id, ep.done('get_user'))
    }
};