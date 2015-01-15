//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :app.js
//        description :配置中间件和路由等
//
//        created by 王澍 at  2015年1月8日13:33:36
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var config = require('./config/config');
var multer  = require('multer');
var log4js = require('log4js');
var compress = require('compression');

//配置log4js
log4js.configure({
    appenders: [
        {
            type: 'console',
            category: "console"
        },
        {
            category: 'logFileInfo',
            type: 'file',
            filename: '../logs/fileLog.log',
            maxLogSize: 3145728,
            backups: 4
        },
        {
            category: 'fileAppenderError',
            type: 'file',
            filename: '../logs/errLog.log',
            maxLogSize: 3145728,
            backups: 4
        },{
            category: 'dataAppenderError',
            type: 'file',
            filename: '../logs/dataErrLog.log',
            maxLogSize: 3145728,
            backups: 4
        }
        ,
        {
            category: 'dateFileAppender',
            type: 'dateFile',
            filename: '../logs/dateFileLog.log',
            pattern: '-yyyy-MM-dd',//生成的文件带有日期比如：dateFileLog-2015-1-8.log
            alwayIncludePattern: true //是否总是包含pattern
        }
    ],
    replaceConsole: true//替换控制台
});

//导出模块-让其他层引用该log
exports.logger = function (categoryName) {
    return log4js.getLogger(categoryName || 'logFileInfo');
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(log4js.connectLogger(log4js.getLogger("logFileInfo"), {level: log4js.levels.DEBUG, format: ':remote-addr :method :url :status'}));//日志带有格式format的日志输出
app.use(log4js.connectLogger(log4js.getLogger("logFileInfo"), {level: log4js.levels.DEBUG}));//格式是默认日志的输出
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')(config.sessionConfig.sessionSecret));
app.use(compress());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
var authFiter = require('./fiters/authFiter');
//提供session支持
app.use(session({
    secret: config.sessionConfig.sessionSecret,
    store: new MongoStore({
        db: config.dbConfig.dbName
    }),
    saveUninitialized: false,
    resave: true
}));

app.use(authFiter.authUser);


//上传文件中间件
app.use(multer({
    // dest: path.join(__dirname, 'public/images/uploadImages/'),
    dest: config.uploadFile.dir,//上传目标文件夹
    onFileUploadStart: function (file) {
        //判断文件后缀是否合法，如果不合法，文件将不上传，并且req.files对象为{}空对象；
        var exts = ['jpg','gif','png','jpeg','bmp'];
        var fileExt = file.extension.toLowerCase();
        var bool = false;
        for(var i = 0; i<exts.length;i++){
            if(exts[i] === fileExt){
                bool = true;
                break;
            }
        }
        if(!bool){
            console.log(file.name + ':不支持的文件格式!');
            return false;
        }else{
            return true;
        }
    },
    rename: function (fieldname, filename) {
        //重新命名文件名称
        var uuidnode = require('node-uuid');
        //uuidnode.v1() v1() 是以时间为基础生成uuid，v4()是以随机为基础生成uuid
        var uuid = uuidnode.v1().replace(/-/g, '')//去掉uuid里的‘-’符号
        //返回新的文件名称为：uuid加当前毫秒值
        return  uuid + Date.now();
    },
    limits:{
        fieldSize:3145728
    },
    onError: function (error, next) {
        console.log('上传文件错误：' + error.stack);
        next(error)
    }
}));






app.use(function(req, res, next){
    res.locals.email = config.personalInformation.email;
    res.locals.beiAnHao = config.personalInformation.beiAnHao;
   // res.locals.userInfo = req.session.userInfo;
    next();
});

var index = require('./controller/indexController');
var users = require('./controller/usersController');
//var test = require('./test/testDb');


//app.use('/', routes);
app.use('/', index);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    log4js.getLogger('logFileInfo').warn(err.stack);
    res.render('404', {
        url: config.websiteInfo.indexUrl,
        email:config.personalInformation.email
    });
    //next(err);
});

//node 未能捕获到的异常，比如异常退出等等
process.on('uncaughtException', function (err) {
    log4js.getLogger('fileAppenderError').error('未处理的异常：' + err.stack);
});

// error handlers

// development error handler
// will print stacktrace
//开发模式进入该if
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        log4js.getLogger('fileAppenderError').error(err.stack);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
//非开发模式进入该if
app.use(function(err, req, res, next) {
    log4js.getLogger('fileAppenderError').error(err.stack);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
