


let socket = io();
socket.on('connect', function()  {console.log('Connected To Server')});
socket.on('newMessage', (message) => {
    console.log(message);
})
const createMessage = function()  {
    socket.emit('createMessage', {});
}
socket.on('disconnect', function()  {console.log('Disconnected From Server')});