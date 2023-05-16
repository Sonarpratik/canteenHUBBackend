const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
});

// const User = mongoose.model("USER", userSchema);
// module.exports = User;

module.exports = mongoose.model("User", user);