function asyncFunction(callback) {
  setTimeout(function() {
    callback()
  }, 200);
}

var color = 'blue';
// 对asyncFunction的调用被封装到了一个以color为参数的匿名函数里,这样你就可以马上执行这个匿名函数，把当前的color的值传给它。而color变成了匿名函数的参数，也就是这个匿名函数内部的本地变量
(function(color) {
  asyncFunction(function() {
    console.log('The color is ' + color);
  })
})(color);
// 匿名函数外面的color值发生变化时，本地版的color不会受影响
color = 'green';