


let socket = io();
socket.on('connect', function()  {console.log('Connected To Server')});
socket.on('newMessage', function(info)  {
    console.log(info);
});
const createMessage = function()  {
    socket.emit('createMessage', {
        message: 'Welcome From Client'
    })
}
socket.on('disconnect', function()  {console.log('Disconnected From Server')});