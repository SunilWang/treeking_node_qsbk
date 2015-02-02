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
        userName:'admin',
        passwd:'1111',
        //bName:'testdb', //数据库的名字
        dbPath: '127.0.0.1', //数据库的连接地址
        dbPort: 27017, //数据库的端口号
        dbUrl:'mongodb://127.0.0.1/qsbknode'
    },
    /*应用配置*/
    appConfig:{
        port:3000//启动端口
    },
    //session配置信息
    sessionConfig:{
        sessionSecret:'qsbkNode2015',//session密钥
        auth_cookie_name:'false_qsbk' //cookie的名字
    },
    //网站信息
    websiteInfo:{
        indexUrl:'http://www.ahwangshu.com' //首页网址
    },
    //文件上传路径
    uploadFile:{
        dir:'../public/images/uploadImages/'
    },
    //非法请求消息和堆栈信息的映射名称
    customServerError:{
        CustomServerErrorMessage : '@@CustomServerErrorMessage',
        CustomServerErrorStackInfo : '@@CustomServerErrorStackInfo'
    },
    //加密的密钥
    encryption:{
        secret:'@qsbk&Node@'
    },
    personalInformation:{
        email:'ahwangshu@qq.com', //联系方式email
        beiAnHao:'皖ICP备14010130号-2'
    },
    list_storyInfo_count:10 //每页显示的个数

};