
let socket = io();
socket.on('connect', function()  {console.log('Connected To Server')});
socket.on('newMessage', (message) => {
    console.log(message);
    let background = 'white', color = 'black';
    if(message.me){
        background = 'blue';
        color      = 'white';
        message.from = 'Me';
    }
    const li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    li.css({
        listStylePosition: 'inside',
        background,
        color
    })
    $('#messages').append(li);
})
const createMessage = function()  {
    socket.emit('createMessage', {}, function(ack){
        console.log('Got it', ack);
    });
}
socket.on('newLocationMessage', message => {
    const li = $('<li></li>');
    li.css({
        listStylePosition: 'inside'
    })
    const link = $(`<a href='https://www.google.com/maps/?q=${message.text}' target='__blank' >Location</a>`);
    li.append('<span>Admin</span>');
    li.append(link);
    $('#messages').append(li);
});
socket.on('disconnect', function()  {console.log('Disconnected From Server')});

$(function(){
    $('#message_form').on('submit', (e) => {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            message: $('#msg').val()
        });
        $('#msg').val('');
    })
    const locationButton = $('#location_button');
    locationButton.on('click', e => {
        if(!navigator.geolocation){
            return alert('You do not support Geolocation Api');
        }
        navigator.geolocation.getCurrentPosition(pos => {
            socket.emit('createLocationMessage', {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });
        }, err => {
            return alert('Unable To Fetch Location');
        })
    })
})