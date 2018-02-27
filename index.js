var express = require("express");
var path    = require("path");
var HashMap = require('hashmap');
var app = express();
var port = 61330;

var userMap = new HashMap();

app.use(express.static(__dirname+"/public"));
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
	console.log('unknown guest has connected, SocketId: ' + socket.id);

	socket.on('clientInfo', function(data){
        console.log( data.username + ' has connected to the chat. SocketId: ' + socket.id);
        userMap.set(socket.id, data.username);
        io.sockets.emit('onUsersChanged', userMap.values());
    });

    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });

    socket.on('disconnect', function(){
        console.log( userMap.get(socket.id) + ' has disconnected from the chat.' + socket.id);
        userMap.delete(socket.id)
        io.sockets.emit('onUsersChanged', userMap.values());
    });
});
console.log("Listening on port " + port);

