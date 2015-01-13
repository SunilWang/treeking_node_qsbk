/**
 * Created by wangshu on 2015/1/10.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :objUtil.js
//        description：对象工具类
//
//        created by 王澍 at  2015年1月10日1:26:36
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================

exports.isEmptyObj=function(obj){
    if(typeof obj != "object"){
        return false;
    }
    for(var e in obj)
    {
        return false;
    }
    return true;
}

exports.deleteEmptyProperty = function(obj){
    for(var o in obj){
        if(!obj[o]){
            delete obj[o]
        }
    }
    return obj;
}