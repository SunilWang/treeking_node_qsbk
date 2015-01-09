//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :users.js
//        description：
//
//        created by 王澍 at  2015年1月8日15:09:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var express = require('express');
var router = express.Router();
var authFiter = require('../fiters/authFiter');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resourceaaaa');
});

/* GET users listing. */
router.get('/add', function(req, res) {
    res.send('user add');
});

/* GET users listing. */
router.get('/list',authFiter.authorize, function(req, res) {
    res.send('user add');
});

module.exports = router;
