const mongoose = require("mongoose");

const contri = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String,  required: true },
  img: { type: String, required: true },
});

// const User = mongoose.model("USER", userSchema);
// module.exports = User;

module.exports = mongoose.model("Contri", contri);