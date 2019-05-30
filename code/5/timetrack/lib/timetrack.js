/**
 * 工作记录存储的逻辑
 */
var qs = require('querystring');
// 发送HTML响应
exports.sendHtml = function(res, html) { 
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}
// 解析HTTP POST数据
exports.parseReceivedData = function(req, cb) { 
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){ body += chunk });
  req.on('end', function() {
    var data = qs.parse(body);
    console.log(data);
    cb(data);
  });
};

exports.actionForm = function(id, path, label) { 
  var html = '<form method="POST" action="' + path + '">' +
    '<input type="hidden" name="id" value="' + id + '">' +
    '<input type="submit" value="' + label + '" />' +
    '</form>';
  return html;
};
// 添加
exports.add = function(db, req, res) {
  // 解析HTTP POST数据
  exports.parseReceivedData(req, function(work) {
    // 添加工作记录的SQL 
    db.query(
      "INSERT INTO work (hours, date, description) " + 
      " VALUES (?, ?, ?)",// 产生占位符
      // 工作记录数据
      [work.hours, work.date, work.description], // 替换占位符
      function(err) {
        if (err) throw err;
        // 给用户显示工作记录清单
        exports.show(db, res); 
      }
    );
  });
};
// 删除
exports.delete = function(db, req, res) {
  // 解析HTTP POST数据
  exports.parseReceivedData(req, function(work) { 
    // 删除工作记录的SQL
    db.query(
      "DELETE FROM work WHERE id=?", 
      [work.id], // 工作记录ID
      function(err) {
        if (err) throw err;
        // 给用户显示工作记录清单
        exports.show(db, res); 
      }
    );
  });
};
// 更新 
exports.archive = function(db, req, res) {
  // 解析HTTP POST数据
  exports.parseReceivedData(req, function(work) { 
    db.query(
      // 更新工作记录的SQL 
      "UPDATE work SET archived=1 WHERE id=?", 
      [work.id], // 工作记录ID
      function(err) {
        if (err) throw err;
        // 给用户显示工作记录清单
        exports.show(db, res); 
      }
    );
  });
};

exports.show = function(db, res, showArchived) {
  // 获取工作记录的SQL
  var query = "SELECT * FROM work " + 
    "WHERE archived=? " +
    "ORDER BY date DESC";
  var archiveValue = (showArchived) ? 1 : 0;
  db.query(
    query,
    [archiveValue], // 替换？
    function(err, rows) {
      if (err) throw err;
      html = (showArchived)
        ? ''
        : '<a href="/archived">工作列表</a><br/>';
      // 将结果格式化为HTML表格
      html += exports.workHitlistHtml(rows); 
      html += exports.workFormHtml();
      // 给用户发送HTML响应
      exports.sendHtml(res, html); 
    }
  );
};

exports.showArchived = function(db, res) {
  exports.show(db, res, true); 
};
// 将工作记录渲染为HTML表格
exports.workHitlistHtml = function(rows) {
  var html = '<table>';
  // 将每条工作记录渲染为HTML表格中的一行
  for(var i in rows) { 
    html += '<tr>';
    html += '<td>' + rows[i].date + '</td>';
    html += '<td>' + rows[i].hours + '</td>';
    html += '<td>' + rows[i].description + '</td>';
    // 如果工作记录还没保存，显示保存按钮
    if (!rows[i].archived) { 
      html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
    }
    html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
    html += '</tr>';
  }
  html += '</table>';
  return html;
};
// 用来添加、保存、删除工作记录的HTML表单
exports.workFormHtml = function() {
  
  // 渲染用来输入新工作记录的空白HTML表单
  var html = '<form method="POST" action="/">' + 
    '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"><p/>' +
    '<p>Hours worked:<br/><input name="hours" type="text"><p/>' +
    '<p>Description:<br/>' +
    '<textarea name="description"></textarea></p>' +
    '<input type="submit" value="Add" />' +
    '</form>';
  return html;
};
// 渲染把保存按钮表单
exports.workArchiveForm = function(id) { 
  return exports.actionForm(id, '/archive', 'Archive');
}
// 渲染删除按钮表单
exports.workDeleteForm = function(id) { 
  return exports.actionForm(id, '/delete', 'Delete');
}