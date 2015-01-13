/**
 * Created by wangshu on 2015/1/10.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :requestProcessing.js
//        description：请求处理工具类
//
//        created by 王澍 at  2015年1月10日1:26:36
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var log4js = require('./../app').logger('fileAppenderError');
var config = require('../config/config');
var customServerError = require('../config/config').customServerError;
function requestProcessing(){}


//自定义错误信息，防止用户非法操作提交数据
requestProcessing.customServerError = function(req,res){
    var customServerErrormessage = req.flash(customServerError.CustomServerErrorMessage);
    var customServerErrorStackInfo = req.flash(customServerError.CustomServerErrorStackInfo);
    if(customServerErrorStackInfo.length){
        customServerErrormessage = customServerErrormessage.length ? customServerErrormessage : '非法请求';
        log4js.error(this.getClientIP(req) +' : 非法操作  '+customServerErrormessage + ' : '+ customServerErrorStackInfo.toString());
        res.render('error', {
            message: customServerErrormessage,
            error: {
                status : '',
                stack : '您的IP：'+this.getClientIP(req)+' 我们已经收录，请不要继续非法操作！' + '\r\n\r\n\r\n' + customServerErrorStackInfo.toString()
            }
        });
    }else{
        res.redirect('/customServerError/empty');
    }
}

//获取客户端IP
//这个方法可以判断你是否使用了nginx和一般情况
requestProcessing.getClientIP = function(req){
    var ipAddress;
    var headers = req.headers;
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}


module.exports = requestProcessing;