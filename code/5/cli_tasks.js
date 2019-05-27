// 输入命令node cli_tasks.js add 1.0 将命令写入文件存储
var fs = require('fs');
var path = require('path');
// process.argv返回命令的组成部分
// splice(2)返回新数组去除前两个元素，原有数组剩下前两个元素
var args = process.argv.splice(2);
// console.log(args)
// 创建新数组返回原数组的第一个
var command = args.shift();
var taskDescription = args.join(' ');
console.log('taskDescription:'+taskDescription)
// process.cwd()返回文件工作路径
var file = path.join(process.cwd(), '/.tasks');

switch(command) {
  // 以保存任务
  case 'list':
    listTasks(file);
    break;
  // 添加新任务
  case 'add':
    addTask(file, taskDescription);
    break;

  default:
    console.log('Usage: ' + process.argv[0]
      + ' list|add [taskDescription]');
}
// 获取已有任务
function loadOrInitializeTaskArray(file, cb) {
  // 检查.tasks文件是否已经存在
  
  fs.exists(file, function(exists) {
    var tasks = [];
    
    if (exists) {
      // 从.tasks文件中读取待办事项数据
      fs.readFile(file, 'utf8', function(err, data) {
        
        if (err) throw err;
        var data = data.toString();
        
        // 把用JSON编码的待办事项数据解析到任务数组中
        var tasks = JSON.parse(data || '[]');
        console.log('tasks；'+tasks)
        cb(tasks);
      });
    } else {
      // 如果.tasks文件不存在，则创建空的任务数组
      cb([]); 
    }
  });
}
// 列出任务的函数
function listTasks(file) {
  loadOrInitializeTaskArray(file, function(tasks) {
    for(var i in tasks) {
      console.log(tasks[i]);
    }
  });
}
// 把任务保存到磁盘中
function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(err) {
    if (err) throw err;
    console.log('Saved.');
  });
}
// 添加一项任务
function addTask(file, taskDescription) {
  var task = []
  loadOrInitializeTaskArray(file, function(tasks) {
    
    for(var i in tasks) {
      task.push(tasks[i]);
    }
    
    task.push(taskDescription);
    console.log(task);
    storeTasks(file, task);
  });
}
