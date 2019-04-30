
let socket = io();
socket.on('connect', function()  {console.log('Connected To Server')});
socket.on('newMessage', (message) => {
    const template = $('#message_template').html();
    let color = 'text-primary';
    if(message.me){
        message.from = 'Me';
        color = 'text-success'
    }
    const messages = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: message.createdAt,
        color
    });
    $('#messages').append(messages);
})
const createMessage = function()  {
    socket.emit('createMessage', {}, function(ack){
        console.log('Got it', ack);
    });
}
socket.on('newLocationMessage', message => {
    const locationTemplate = $('#location_message_template').html();
    const locationMessage = Mustache.render(locationTemplate, {
        from: message.from,
        url: `https://www.google.com/maps/?q=${message.text}`,
        createdAt: message.createdAt
    })
    $('#messages').append(locationMessage);
});
socket.on('disconnect', function()  {console.log('Disconnected From Server')});

$(function(){
    $('#message_form').on('submit', (e) => {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            message: $('#msg').val()
        }, function(){
            $('#msg').val('');    
        });
        
    })
    const locationButton = $('#location_button');
    locationButton.on('click', e => {
        locationButton.prop('disabled', true).text('Sending location...');
        if(!navigator.geolocation){
            locationButton.prop('disabled', false).text('Send location');
            return alert('You do not support Geolocation Api');
        }
        navigator.geolocation.getCurrentPosition(pos => {
            locationButton.prop('disabled', false).text('Send location');
            socket.emit('createLocationMessage', {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });
        }, err => {
            return alert('Unable To Fetch Location');
        })
    })
})