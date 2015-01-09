/**
 * Created by admin on 2015/1/8.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :routeManager.js
//        description：路由管理js
//
//        created by 王澍 at  2015年1月8日17:40:36
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var usersController = require('../controller/usersController');
var indexController = require('../controller/indexController');
expect.routeManager = function(app){

    //网站主页注册信息
    app.use('/',usersController);
    //用户路由注册信息
    app.use('/user',indexController);
}