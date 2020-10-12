$(function () {
    let socket = io();
    $('form').submit(function(){
        socket.emit('chat message', { 'name': $('#un').val(), 'message': $('#m').val()});
        $('#m').val('');
        return false;
    })

});
