/**
 * Created by admin on 2015/1/8.
 */
var moment = require('moment');
var uuid = require('node-uuid');
var str = ' abc  def ghi  jk  ';
/*var sp = str.split(' ');
str = sp.join('');*/
/*sp = str.trim()
console.log(sp);*/

/*
var de = new Date('Fri Jan 09 2015 11:55:08 GMT+0800');
var mom = moment('Fri Jan 09 2015 11:55:08 GMT+0800')
var filename = '王澍.jpg';
*/

//console.log(filename.replace(/\W+/g, '-').toLowerCase() + Date.now());
/*var uuid = uuid.v1();

console.log( typeof uuid )

uuid = uuid.replace(/-/g, '')
console.log(uuid+Date.now());*/
/*
var objj = function(){};
function isEmptyObj(obj){ var e;for(e in obj){return false} return true } var obj = {}; isEmptyObj(obj);
if(isEmptyObj(objj)){
    console.log('11111111111111111');
}else{
    console.log('222222222222222');
}*/

var aa = new Date();

console.log(aa.getTime());

console.log(Date.now());