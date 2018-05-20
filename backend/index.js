var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/boop', function(req, res){
	res.send('moop');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', {text: msg.text, nick: msg.nick, color: msg.color});
  });
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
