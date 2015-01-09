/**
 * Created by admin on 2015/1/8.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :config.js
//        description :全局配置信息
//
//        created by 王澍 at  2015年1月8日15:06:12
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
//全局配置信息
module.exports = {
    //mongodb数据库配置
    dbConfig: {
        dbName: 'qsbknode',//数据库的名字
        //bName:'testdb', //数据库的名字
        dbPath: '127.0.0.1', //数据库的连接地址
        dbPort: 27017 //数据库的端口号
    },
    /*应用配置*/
    appConfig:{
        port:3000//启动端口
    },
    //session配置信息
    sessionConfig:{
        sessionSecret:'qsbkNode2015' //session密钥
    },
    //404错误页面显示消息
    _404page:{
        url:'http://localhost:3000/', //跳转的页面
        email:'ahwangshu@qq.com' //联系方式email
    }

};