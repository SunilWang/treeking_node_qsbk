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
var bodyParser = require('body-parser');
var log4js = require('log4js');

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
            filename: 'logs/fileLog.log',
            maxLogSize: 102400,
            backups: 4
        },
        {
            category: 'fileAppenderError',
            type: 'file',
            filename: 'logs/errLog.log',
            maxLogSize: 102400,
            backups: 4
        },
        {
            category: 'dateFileAppender',
            type: 'dateFile',
            filename: 'logs/dateFileLog.log',
            pattern: '-yyyy-MM-dd',//生成的文件带有日期比如：dateFileLog-2015-1-8.log
            alwayIncludePattern: true//是否总是包含pattern
        }
    ],
    replaceConsole: true//替换控制台
});

//导出模块-让其他层引用该log
exports.logger = function (categoryName) {
    return log4js.getLogger(categoryName || 'logFileInfo');
};



var routes = require('./routes/index');
var users = require('./routes/users');


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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
