/**
 * Created by wangshu on 2015/1/10.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :encryption.js
//        description：加密字符串的工具类
//
//        created by 王澍 at  2015年1月10日20:55:27
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//======================================================================
var crypto = require('crypto');
var config = require('../config/config');

function encryption(){}

encryption.digest = {
    base64:'base64',
    hex:'hex'
}

//字符串加密，不可逆转的--str:需要加密的字符串；digest:要加密的算法（有base64和hex），可在encryption.digest 中取值
encryption.md5 = function(str,digest){
        if(!digest){
            digest = encryption.digest.hex;
        }else if(!encryption.digest[digest]){
            digest = encryption.digest.hex;
        }
        var md5sum = crypto.createHash('md5');
        md5sum.update(str);
        str = md5sum.digest(digest);
        return str;
}

//加密解密两者密钥一定要一样可以到配置文件config.encryption.secret设置、取值
//加密--str:需要加密的字符串；secret:密钥（字符串根据这个密钥来加密）
encryption.encrypt = function (str, secret) {
    if(!secret){
        secret = config.encryption.secret;
    }
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

//加密解密两者密钥一定要一样可以到配置文件config.encryption.secret设置、取值
//解密--str:需要解密的字符串；secret:密钥（字符串根据这个密钥来解密）
encryption.decrypt = function (str, secret) {
    if(!secret){
        secret = config.encryption.secret;
    }
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};


module.exports = encryption;