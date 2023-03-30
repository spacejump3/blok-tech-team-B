const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: 0,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;