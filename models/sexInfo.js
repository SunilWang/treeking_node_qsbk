/**
 * Created by admin on 2015/1/9.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :sexlInfo.js
//        description：等级实体类
//
//        created by 王澍 at  2015年1月9日15:34:21
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
/*
默认列表值：
 1 程序猿
 2 程序媛
 3 程序员
 */

var SexInfoSchema = new Schema({
    sexName: { type: String,default: ''}//性别
});


SexInfoSchema.index({sexName: 1});


/*SexInfoSchema.virtual('kingtree').get(function () {
        if(this.sexName === '程序员'){
            return '普通的人';
        }else if(this.sexName === '程序媛'){
            return '美眉看过来';
        }
});*/

/*PersonSchema.virtual('name.full').get(function () {
        return this.name.first + ' ' + this.name.last;
    }).set(function (setFullNameTo) {
        var split = setFullNameTo.split(' ')
            , firstName = split[0]
            , lastName = split[1];

        this.set('name.first', firstName);
        this.set('name.last', lastName);
    });*/

mongoose.model('SexInfo', SexInfoSchema);