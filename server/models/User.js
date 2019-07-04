const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "devices"
  }
});

module.exports = mongoose.model("users", userSchema);
