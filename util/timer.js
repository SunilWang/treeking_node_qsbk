/**
 * Created by wangshu on 2015/1/10.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :time.js
//        description：定时器工具类
//
//        created by 王澍 at  2015年1月10日1:26:36
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var schedule = require("node-schedule");

function timer(){}

timer.value = null;


timer.open = function(fun){
    if(!timer.value){
        timer.value = schedule.scheduleJob('*/1 * * * *', function(){
           fun();
        });
    }
}

timer.close = function(){
    if(timer.value){
        timer.value.cancel();
        timer.value = null;
    }
}

module.exports = timer;
