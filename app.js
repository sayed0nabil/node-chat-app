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
    console.log('New User Connected');
    socket.on('createMessage', (data, callback) => {
        socket.emit('newMessage', {
            ...generateMessage(data.from, data.message),
            me: true
        })
        socket.broadcast.emit('newMessage', generateMessage(data.from, data.message))
        // callback('Messages Sent Successfully');
    })
    socket.on('disconnect', function(socket){  console.log('User Disconnected')});
});
// app.get('/main', (req, res) => {
//     res.sendFile(`${rightPath}/index.html`);
// })
server.listen(port, () => console.log(`listening on port ${port}`));