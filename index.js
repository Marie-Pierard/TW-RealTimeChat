const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  // Create absolute path
  res.sendFile(__dirname + '/public/index.html'); 
});

io.on('connection', (socket) => {
  // Confirm user connection
  console.log(`A user connected`);

  socket.on('connect', () => {
    socket.broadcast.emit('A new user entered the chat');
  })

  // New message 
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Socket disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected`);
  });
});

http.listen(3000, () => {
  console.log(`listening on *:3000`);
});
