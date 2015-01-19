/**
 * Created by wangshu on 2015/1/10.
 */
var config = require('../config/config');
/*
 var test = function(){
 this.name ='网速';
 this.age = 0;
 }

 var objTest = new test();
 objTest.age = 18;


 console.log(objTest);*/
/*
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var password = md5.update('abcdefg').digest('hex');
//var password2 = md5.update('abcdefg').digest('base64');
console.log(password);
//console.log(password2);*/
var encryption = require('../util/encryption');


//console.log(encryption.md5('adsf','aaa'))
/*var en = encryption.encrypt('王澍sss',config.encryption.secret);
console.log(en);

var de = encryption.decrypt('1dd702464da8ffefcea8bf4507a56207',config.encryption.secret)
console.log(de);*/

/*
var obj = function (name,age,aihao,pass){
    this.name = name;
    this.age = age;
    this.aihao = aihao;
    this.pass = pass;
}

var oob = new obj(null,11);

for(var o in oob){
    if(!oob[o]){
        delete oob[o]
    }
}
console.log(oob);
*/
/*
var arr =['abc','def','ghi','jkl'];

console.log(arr.indexOf('ef'));
*/

/*
var now = new Date();
var hot = new Date(new Date(new Date()-24*60*60*1000*1));
//hot = hot.setDate(hot.getDate() -1);
console.log(hot);*/

var str = '../public/images/uploadImages/99dca5509e6411e4ad30b36fa131acbb1421511564325.jpg'
console.log(str.lastIndexOf('c/'));
