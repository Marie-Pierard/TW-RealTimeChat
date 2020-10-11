const express = require('express'); 
const app = require('express'); // Create Express app
const http = require('http').Server(app);
const io = require('socket.io')(http); 


app.get('/', (req, res) => {
  // Use absolute path !
  res.sendFile(__dirname + '/public/index.html');
});
// Import statics file's folder 
app.use(express.static(__dirname + '/public'));


// Use different namespace
// var nsp = io.of("/my-namespace");
// nsp.on("connection", function (socket) {
//   console.log("someone connected");
//   nsp.emit("hi", "Hello everyone!");
// });

var clients = 0;
io.on("connection", function (socket) {
  clients++;
  socket.emit("newclientconnect", { description: "Hey, welcome!" });
  socket.broadcast.emit("newclientconnect", {
    description: `${clients} clients connected!`,
  });
  socket.on("disconnect", function () {
    clients--;
    socket.broadcast.emit("newclientconnect", {
      description: `${clients} clients connected!`,
    });
  });
});

// var clients = 0;
// // Executed at each new connection 
// io.on('connection', (socket) => {

//   setTimeout(function () {
//     io.sockets.emit('customBroadcast', { description: `Welcome to our super chat` });
//   }, 5000);

//   console.log(`New connection`);

//   // 3. Send a brodcast event to all clients
//   clients++;
//   io.sockets.emit('broadcast', { description: `${clients} clients connected!` });

//   // 1. Send a message when 
//     setTimeout(function() {
//       // Send custom event
//       socket.emit('testerEvent', { description: 'A custom event named testerEvent!' });
//     }, 2000);

//   // 2. Receive custom event from client
//   socket.on('clientEvent', function(data) {
//       console.log(data);
//     });

//   // New message 
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });

//   // Execute at each disconnection
//   socket.on('disconnect', () => {
//     console.log(`User disconnected`);
//   });
// });

// var roomno = 1;
// io.on("connection", function (socket) {
//   //Increase roomno if 2 clients are present in a room.
//   if (
//     io.nsps["/"].adapter.rooms[`room-${roomno}`] &&
//     io.nsps["/"].adapter.rooms[`room-${roomno}`].length > 1
//   )
//     roomno++;
//   socket.join(`room-${roomno}`);

//   //Send this event to everyone in the room.
//   io.sockets
//     .in(`room-${roomno}`)
//     .emit("connectToRoom", `You are in room no. ${roomno}`);
// });



http.listen(3000, () => {
  console.log(`listening on *:3000`);
});
