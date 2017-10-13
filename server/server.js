const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    // socket.leave(params.room);

    // io.emit                -> send to all                          -> io.to(params.room).emit
    // socket.broadcast.emit  -> send to all excluding  current user  -> socket.broadcast.to(params.room).emit
    // socket.emit            -> send to the current user only

    socket.emit('newMessage', generateMessage('admin', `Welcome to the [${params.room}] chat room`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined the [${params.room}] chat room`));

    callback();
  });

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
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};