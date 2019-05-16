/**
 * Created by baymax on 16/8/5.
 */
/**
 * 用匿名函数保留全局变量的值
 * */

function asyncFunction(callback){
    setTimeout(callback, 200);
}

var color = "blue";
// 对asyncFunction的调用被封装到了一个以color为参数的匿名函数里,这样你就可以马上执行这个匿名函数，把当前的color的值传给它。而color变成了匿名函数的参数，也就是这个匿名函数内部的本地变量
(function (color) {
    asyncFunction(function () {
        //下面的 console 在200毫秒之后执行
        console.log("The color is " + color);
    });
})(color);

color = "green";