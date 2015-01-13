/**
 * Created by wangshu on 2015/1/10.
 */
var schedule = require("node-schedule");


/*var rule = new schedule.RecurrenceRule();

var times = [];

for(var i=1; i<60; i++){

    times.push(i);
}

　　rule.second = times;

　　var c=0;
　　var j = schedule.scheduleJob(rule, function(){
    　　 c++;
      　　console.log(c);
　　});*/

var j = schedule.scheduleJob('*/1 * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
});
