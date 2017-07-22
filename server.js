'use strict';
var osc = require('node-osc');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3333;

var oscServer = new osc.Server(PORT, '192.168.1.11');
console.log("start up");
// console.log(oscServer);

app.get(`/`, (req, res) => {
    res.sendFile(__dirname + '/docs/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    oscServer.on('message', function (msg) {
        console.log('Message:');
        console.log(msg);
        //socket.emit('chat message', $('#m').val());
        socket.emit('msg',msg);

    });
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});



