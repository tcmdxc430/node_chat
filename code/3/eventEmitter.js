var EventEmitter = require('events').EventEmitter
var channel = new EventEmitter()
channel.on('join', function() {
    console.log('wel')
});
channel.emit('join')