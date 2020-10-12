
let mongoose = require('mongoose');

let ChatSchema = new mongoose.Schema({
  room: Number,
  user: String,
  date: Date,
  message: String
});

module.exports = Chatmessage = mongoose.model("Chatmessage", ChatSchema);