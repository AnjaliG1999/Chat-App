// const express = require('express');
// const app = express();

// const app = require('express')();
// const http = require('http').createServer(app);
const io = require('socket.io')(8000);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// initialize a new instance of socket.io by passing the http (the HTTP server) object, then listen on the connection event for incoming sockets
io.on('connection', socket => {
    console.log("A user connected");
    // socket.broadcast.emit('chat message', "A user connected")

    // // broadcasts the message to everyone but the sender
    // // socket.broadcast.emit('hi');

    socket.on('chat message', (msg) => {
        console.log("message:", msg);
        // io.emit('chat message', `${msg.user}: ${msg.text}`)
    })

    socket.on('disconnect', () => {
        console.log("User disconnected");
        // socket.broadcast.emit('chat message', "User disconnected")
    })
})

// http.listen(3000, () => {
//     console.log('listening on *:3000');
// })