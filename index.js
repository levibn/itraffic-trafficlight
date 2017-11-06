var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/digital-7.ttf', function(req, res){
  res.sendFile(__dirname + '/digital-7.ttf');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
  });  

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    
server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' -' + message);
    io.emit('newTiming', remote.address + ':' + remote.port +' -' + message);

});

server.bind(PORT, HOST);