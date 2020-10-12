
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String
});

module.exports = User = mongoose.model("User", UserSchema);