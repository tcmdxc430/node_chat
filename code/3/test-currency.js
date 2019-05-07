
// require为同步方式 所以尽量在程序初始化时加载一次 可忽略扩展名
var currency = require('./currency'); 

console.log('50 Canadian dollars equals this amount of US dollars:');
console.log(currency.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.USToCanadian(30));
