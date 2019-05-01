const rightPath = `${__dirname}/public`,
      http      = require('http');
// NPM packages
const express = require('express'),
      app     = express(),
      socketIO = require('socket.io');

// Custom Modules
const { generateMessage } = require('./utils/message');
const port  =  process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketIO(server);
let info = [];
app.use(express.static(rightPath));
io.on('connection', function(socket)  {
    socket.on('join', (params, callback) => {
        if(params.name.trim().length === 0 || params.room.trim().length === 0){
            callback('Name and room are required');
        }else{
            socket.join(params.room);
            socket.emit('newMessage', generateMessage('Admin', 'Welcome In Node Chat App'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} Joind To Room`));
            callback();
        }
    })
    socket.on('createMessage', (data, callback) => {
        socket.emit('newMessage', {
            ...generateMessage(data.from, data.message),
            me: true
        })
        socket.broadcast.to(data.room).emit('newMessage', generateMessage(data.from, data.message))
        callback();
    })
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateMessage('Admin', `${coords.latitude},${coords.longitude}`))
    })
    socket.on('disconnect', function(socket){  console.log('User Disconnected')});
});
// app.get('/main', (req, res) => {
//     res.sendFile(`${rightPath}/index.html`);
// })
server.listen(port, () => console.log(`listening on port ${port}`));