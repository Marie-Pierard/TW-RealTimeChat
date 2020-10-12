const app = require("express")();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const Chat = require("./models/Chat");
const connect = require("./dbconnect");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// setup event listener
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('connect', () => {
    // socket.broadcast.emit('A new user entered the chat');
    io.emit('chat message', 'new user connected');
  });

  socket.on('chat message', (msg) => {
    // io.emit('chat message', msg);
    console.log('message: ' + msg);
    //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", { message: msg  });
  });

  // save chat to db
  connect.then(db => {
    console.log("connected correctly to the server");

    let chatMessage = new Chat({ message: msg, sender: "Anonymous"});
    chatMessage.save();
  });

});

// require("./routes/userRoutes")(app);

http.listen(port, () => {
  console.log('listening on *:3000');
});