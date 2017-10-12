const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat room'));
  socket.broadcast.emit('newMessage', generateMessage('admin@example.com', 'Another user has joined the chat room'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    // send to all sockets
    io.emit('newMessage', generateMessage(message.from, message.text));

    // sends to all sockets, except the socket that initialised the event
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    callback('This is from the server');
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};