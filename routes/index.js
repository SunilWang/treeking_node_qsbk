var express = require('express');
var router = express.Router();
var log4js = require('./../app').logger();
/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'Express' });
});

module.exports = router;
