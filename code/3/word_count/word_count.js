var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';

function checkIfComplete() {
  completedTasks++;
  if (completedTasks == tasks.length) {
    for(var index in wordCounts) { 
      console.log(index +': ' + wordCounts[index]);
    }
  }
}

function countWordsInText(text) {
  // 把文件内容按单词分割并排序 返回数组
  var words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();

  for(var index in words) { 
    var word = words[index];
    if (word) {
      // 计算单词出现次数
      wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
    }
  }
}
// 把filesDir文件夹下的所有文件放到一个数组files中
fs.readdir(filesDir, function(err, files) { 
  
  if (err) throw err;
  for(var index in files) {
    // 将拼接的路径传入自执行的task
    var task = (function(file) {
      
      return function() {
        // 文件内容16进制解析
        fs.readFile(file, function(err, text) {
          
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      }
    })(filesDir + '/' + files[index]);
    
    tasks.push(task); 
  }
  // 把每个文件按数组顺序解析
  for(var task in tasks) { 
    tasks[task]();
  }
});
