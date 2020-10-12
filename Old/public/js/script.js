// // Socket.IO Script
// $(function () {
//     // client socket initialize
//     const socket = io();

//     $('form').submit(function (e) {
//         e.preventDefault(); // prevents page reloading
//         socket.emit('chat message', $('#m').val());
//         $('#m').val('');
//         return false;
//     });
//     socket.on('chat message', function (msg) {
//         $('#messages').append($('<li>').text(msg));
//     });
//      // Display user connection
//     socket.on('connection', () => {
//         io.emit(`A new user is connected`);
//     })
// });




