/**
 * Created by admin on 2015/1/9.
 */

function getLength(str){
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    for(var i=0; i<len; i++)
    {
        charCode = str.charCodeAt(i);
        if(charCode >=0 && charCode <= 128)
        {
            realLength++;
        }
        else
        {
            realLength = realLength + 2;
        }

    }
    return realLength;
}

function clear(str){
    var temp="";
    var string = ''+str;
    splitstring = string.split(" ");
    for(var i = 0; i<splitstring.length; i++)
    {
        temp = temp + splitstring[i];
    }
    return temp;
}