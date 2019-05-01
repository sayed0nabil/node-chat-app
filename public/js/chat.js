
let socket = io();
const scrollToBottom = () => {
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child')
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const clientHeight = messages.prop('clientHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();
    if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop( scrollHeight );
    }
}
socket.on('connect', function()  {
    const params = jQuery.deparam(location.search.substr(1, location.search.length - 1));
    socket.emit('join', params, err => {
        if(err){
            location.href = '/';
        }else{
            console.log('No Error');
        }
    })
});
socket.on('newMessage', (message) => {
    const template = $('#message_template').html();
    let color = 'text-primary';
    if(message.me){
        color = 'text-success'
    }
    const messages = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: message.createdAt,
        color
    });
    $('#messages').append(messages);
    scrollToBottom();
})
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
    const params = jQuery.deparam(location.search.substr(1, location.search.length - 1));
    $('#message_form').on('submit', (e) => {
        e.preventDefault();
        socket.emit('createMessage', {
            from: params.name,
            message: $('#msg').val(),
            room: params.room
        }, function(){
            $('#msg').val('').focus();
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
                longitude: pos.coords.longitude,
                from: params.name,
                room: params.room
            });
        }, err => {
            return alert('Unable To Fetch Location');
        })
    })
})